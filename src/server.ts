require("dotenv").config()

import config from "./config"

//@ts-ignore
import { Server, ResponseToolkit, Request } from "@hapi/hapi"

import { log } from "./log"

const Joi = require("joi")

const Pack = require("../package")

import handlers from "./server/handlers"

import * as deepmerge from "deepmerge"

interface WalletbotServerOptions {
  http: {
    host: string
    port: number
  }
  websockets: {
    host: string
    port: number
  }
  prometheus?:
    | {
        enabled: false
      }
    | {
        enabled: true
        password?: string
      }
}

interface WalletbotServerProps extends WalletbotServerOptions {
  http: {
    host: string
    port: number
  }
  websockets: {
    host: string
    port: number
  }
  prometheus:
    | {
        enabled: false
      }
    | {
        enabled: true
        password?: string
      }
}

const defaultWalletbotServerOptions: WalletbotServerProps = {
  http: {
    host: "0.0.0.0",
    port: 5200,
  },
  websockets: {
    host: "0.0.0.0",
    port: 5202,
  },
  prometheus: {
    enabled: true,
  },
}

class WalletbotServer {
  server: Server

  options: WalletbotServerProps

  constructor(options: WalletbotServerOptions) {
    this.options = deepmerge(defaultWalletbotServerOptions, options)

    this.server = new Server({
      host: this.options.http.host,
      port: this.options.http.port,
      routes: {
        cors: true,
        validate: {
          options: {
            stripUnknown: true,
          },
        },
      },
    })
  }

  async start() {
    await this.server.start()

    log.info(this.server.info)

    return this.server
  }
}

export const server = new Server({
  host: config.get("HOST"),
  port: config.get("PORT"),
  routes: {
    cors: true,
    validate: {
      options: {
        stripUnknown: true,
      },
    },
  },
})

export async function start() {
  await server.register(require("@hapi/basic"))

  server.auth.strategy("prometheus", "basic", {
    validate: async (_: any, password: string) => {
      if (config.get("PROMETHEUS_PASSWORD") == undefined) {
        return { isValid: true, credentials: { id: "public" } }
      }

      if (password === config.get("PROMETHEUS_PASSWORD")) {
        return { isValid: true, credentials: { id: "prometheus" } }
      } else {
        return { isValid: false, credentials: null }
      }
    },
  })

  if (config.get("PROMETHEUS_ENABLED")) {
    log.debug("server.metrics.prometheus", { path: "/metrics" })

    const { register: prometheus } = require("./metrics")

    server.route({
      method: "GET",
      path: "/metrics",
      handler: async (req: Request, h: ResponseToolkit) => {
        return h.response(await prometheus.metrics())
      },
      options: {
        description:
          "Prometheus Metrics about Node.js Process & Business-Level Metrics",
        tags: ["system"],
        auth: "prometheus",
      },
    })
  }

  server.route({
    method: "GET",
    path: "/api/v0/status",
    handler: handlers.Status.index,
    options: {
      description:
        "Simply check to see that the server is online and responding",
      tags: ["api", "system"],
      response: {
        failAction: "log",
        schema: Joi.object({
          status: Joi.string().valid("OK", "ERROR").required(),
          error: Joi.string().optional(),
        }).label("ServerStatus"),
      },
    },
  })

  server.route({
    method: "GET",
    path: "/api/v1/balances",
    handler: handlers.Balances.index,
    options: {
      description: "List coin balances available",
      tags: ["api", "system"],
      response: {
        failAction: "log",
        schema: Joi.object({
          balances: Joi.array().items(
            Joi.object({
              currency: Joi.string().required(),
              value: Joi.number().required(),
              usd_value: Joi.number().required(),
              threshold_minimum: Joi.number().optional(),
              address: Joi.string().optional(),
              last_updated: Joi.date(),
            }),
          ),
        }).label("ServerStatus"),
      },
    },
  })

  server.route({
    method: "GET",
    path: "/api/v1/payments",
    handler: handlers.Payments.index,
    options: {
      description: "List payments sent by the bot app account",
      tags: ["api", "system"],
      response: {
        failAction: "log",
        schema: Joi.object({
          payments: Joi.array().items(Joi.object({})),
        }).label("ListPayments"),
      },
    },
  })

  var started = false

  if (started) return

  started = true

  if (config.get("SWAGGER_ENABLED")) {
    const swaggerOptions = {
      info: {
        title: "API Docs",
        version: Pack.version,
        description:
          "Developer API Documentation \n\n *** DEVELOPERS *** \n\n Edit this file under `swaggerOptions` in `src/server.ts` to better describe your service.",
      },
      schemes: ["http"],
      host: "localhost:5200",
      documentationPath: "/",
      grouping: "tags",
    }

    const Inert = require("@hapi/inert")

    const Vision = require("@hapi/vision")

    const HapiSwagger = require("hapi-swagger")

    await server.register([
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: swaggerOptions,
      },
    ])

    log.info("server.api.documentation.swagger", swaggerOptions)
  }

  await server.start()

  log.info(server.info)

  return server
}

if (require.main === module) {
  start()
}
