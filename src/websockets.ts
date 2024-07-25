import { WebSocket } from "ws"
import config from "./config"
import { log } from "./log"
import { Log, Context } from "./websockets/handlers"

import { handlers } from "./websockets/index"
import { WalletBot } from "./wallet_bot"

let socket: WebSocket | undefined

export { socket }

export async function connect(walletBot: WalletBot): Promise<WebSocket> {
  log.info("websocket.connect", {
    host: walletBot.options.websocket_url,
    transports: ["websocket"],
    extraHeaders: {
      Authorization: `Bearer ${walletBot.options.auth_token}`,
    },
  })

  socket = new WebSocket(String(walletBot.options.websocket_url), {
    headers: {
      Authorization: `Bearer ${walletBot.options.auth_token}`,
    },
  })

  socket.on("open", async () => {
    log.info("websocket.connected")
    if (socket) {
      const balances = await handlers.list_balances(socket, {})
      for (let balance of balances) {
        console.log({ balance })
      }
    }
  })

  socket.on("close", (event) => {
    log.info("websocket.disconnected", event)
  })

  socket.on("error", (error: Error) => {
    log.info("websocket.error", error)
    log.error("websocket", error)
  })

  socket.on("ping", () => {
    log.info("ping")
  })

  socket.on("message", (data: any) => {
    const message = JSON.parse(data.toString())
    const event = message.event as string
    const handler = handlers[event]
    if (handler) {
      if (socket) {
        const log = new Log({ socket })

        const context: Context<any> = {
          socket,
          log,
          message,
        }
        handler(socket, context)
      }
    }
  })

  return new Promise((resolve, reject) => {
    socket!.on("open", () => {
      resolve(socket!)
    })
    socket!.on("error", (error) => {
      reject(error)
    })
  })
}
