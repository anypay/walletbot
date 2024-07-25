import * as winston from "winston"

import * as Transport from "winston-transport"

import config from "./config"

import { socket } from "./websockets"

import { WebSocket } from "ws"

class WebsocketTransport extends Transport {
  socket: WebSocket

  constructor(socket: WebSocket, opts: winston.LoggerOptions) {
    super(opts)

    this.socket = socket
  }

  log(info: string, callback: Function) {
    try {
      if (this.socket) {
        this.socket.emit("log", info)
      }
    } catch (error) {
      console.log("log.websocket.error", error)
    }

    callback()
  }
}

const transports: winston.transport[] = [
  new winston.transports.Console({
    format: winston.format.json(),
  }),
]

if (socket) {
  transports.push(
    new WebsocketTransport(socket, {
      format: winston.format.json(),
    }),
  )
}

if (config.get("LOKI_HOST")) {
  const LokiTransport = require("winston-loki")

  const lokiConfig: {
    format: winston.Logform.Format
    host: string
    json: boolean
    batching: boolean
    labels: { app: string }
    basicAuth?: string
  } = {
    format: winston.format.json(),
    host: config.get("LOKI_HOST"),
    json: true,
    batching: false,
    labels: { app: config.get("LOKI_LABEL_APP") },
  }

  if (config.get("LOKI_BASIC_AUTH")) {
    lokiConfig["basicAuth"] = config.get("LOKI_BASIC_AUTH")
  }

  transports.push(new LokiTransport(lokiConfig))
}

const log = winston.createLogger({
  level: "info",
  transports,
  format: winston.format.json(),
})

if (config.get("LOKI_HOST")) {
  log.debug("loki.enabled")
}

export default log

export { log }
