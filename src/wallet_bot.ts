import axios from "axios"

import * as delay from "delay"

import { connect, MnemonicWallet, config, log, Wallet } from "./"

import { handlers } from "./websockets/index"

import { start as server } from "./server"

import { listUnpaid } from "./invoices"

import { loadWallet } from "./simple-wallet/src"

import { shuffle } from "./utils"

import { Balance } from "./balances"

import { WebSocket } from "ws"

export interface WalletBotOptions {
  seed_phrase: string
  auth_token: string

  api_base?: string
  http_api_enabled?: boolean
  websocket_enabled?: boolean
  websocket_url?: string
  prometheus?: PrometheusOptions
}

interface WalletBotDefaultOptions {
  api_base: string
  http_api_enabled: boolean
  websocket_enabled: boolean
  websocket_url: string
}

export interface PrometheusOptions {
  enabled: boolean
  port: number
  secret?: string
}

export interface WalletBotProps {
  seed_phrase: string
  auth_token: string

  api_base: string
  http_api_enabled: boolean
  websocket_enabled: boolean
  websocket_url: string
}

const default_walletbot_options: WalletBotDefaultOptions = {
  api_base: "https://anypayx.com",
  http_api_enabled: true,
  websocket_enabled: true,
  websocket_url: "wss://wss.anypayx.com",
}

export { default_walletbot_options }

export class WalletBot {
  options: WalletBotProps

  wallet?: Wallet

  constructor(options: WalletBotOptions) {
    if (!options.api_base) {
      options.api_base = "https://anypayx.com"
    }

    if (!options.seed_phrase) {
      throw new Error("seed_phrase is required")
    }

    if (!options.auth_token) {
      throw new Error("auth_token is required")
    }

    if (options.websocket_enabled === undefined) {
      options.websocket_enabled = true
    }

    this.options = {
      ...options,
      api_base: String(options.api_base),
      http_api_enabled: Boolean(options.http_api_enabled),
      websocket_enabled: Boolean(options.websocket_enabled),
      websocket_url: String(options.websocket_url),
    }
  }

  async loadWallet(): Promise<Wallet> {
    if (!this.wallet) {
      const { wallets } = MnemonicWallet.init(this.options.seed_phrase)

      this.wallet = await loadWallet(wallets)
    }

    return this.wallet
  }

  async listBalances(): Promise<Balance[]> {
    const wallet = await this.loadWallet()

    return wallet.balances()
  }

  async start() {
    if (this.options.http_api_enabled) {
      log.info("http_api_enabled")
      server()
    }

    if (!this.options.auth_token) {
      log.error(
        `Please visit https://anypayx.com/dashboard/apps/wallet-bot to get your token`,
      )
      throw new Error("WALLETBOT_AUTH_TOKEN not set in environment variables")
    }

    const { wallets } = MnemonicWallet.init(this.options.seed_phrase)

    this.wallet = await loadWallet(wallets)

    var socket: WebSocket | null = null

    if (this.options.websocket_enabled) {
      socket = await connect(this)
    }

    console.log(
      "Wallet Bot Started -- Listening for Payment Requests to Fulfill",
    )

    while (true) {
      var length = 0

      try {
        let unpaid = await listUnpaid(this)

        length = unpaid.length

        for (let invoice of shuffle<any>(unpaid)) {
          try {
            const url = `${this.options.api_base}/r/${invoice.uid}`

            const { data: options } = await axios.get(url, {
              headers: {
                Accept: "application/payment-options",
                "X-Paypro-Version": 2,
              },
            })

            if (options.paymentOptions.length > 1) {
              const result = await cancelPaymentRequest(this, invoice.uid)

              log.info("payment-request.cancelled", result)

              continue
            }

            const currency = options.paymentOptions[0].currency

            if (currency === "XMR") {
              const result = await cancelPaymentRequest(this, invoice.uid)

              log.info("payment-request.cancelled", result)

              continue
            }

            log.info("invoice.pay", options.paymentOptions[0])

            let result = await this.wallet.payUri(
              `${this.options.api_base}/r/${invoice.uid}`,
              currency,
            )

            log.info("wallet.payInvoice.result", { uid: invoice.uid, result })

            if (this.options.websocket_enabled && socket) {
              handlers.list_balances(socket, {})
            }
          } catch (error) {
            log.error("wallet.payInvoice.error", error)

            /*const result = await cancelPaymentRequest(invoice.uid, token)
    
              log.info('payment-request.cancelled', result)*/
          }
        }
      } catch (error) {
        log.error(error)
      }

      await delay(length > 0 ? 5 : 5200)
    }
  }

  stop() {}
}

async function cancelPaymentRequest(
  walletBot: WalletBot,
  uid: string,
): Promise<any> {
  const { data } = await axios.delete(
    `${walletBot.options.api_base}/r/${uid}`,
    {
      auth: {
        username: walletBot.options.auth_token,
        password: "",
      },
    },
  )

  return data
}
