import { WalletBot } from "./src"

const wallet_bot = new WalletBot({
  seed_phrase: process.env.WALLETBOT_SEED_PHRASE as string,
  auth_token: process.env.WALLETBOT_AUTH_TOKEN as string,
  api_base: "https://anypayx.com",
  prometheus: {
    enabled: true,
    port: Number(process.env.PORT),
    secret: process.env.PROMETHEUS_SECRET,
  },
})

wallet_bot.start()
