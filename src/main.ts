
import { config } from './'

import { WalletBot } from './wallet_bot'

export async function start() {

  const walletBot = new WalletBot({
    seed_phrase: config.get('wallet_bot_backup_seed_phrase'),
    anypay_token: config.get('anypay_access_token'),
    http_api_enabled: config.get('http_api_enabled'),
    websocket_enabled: true,
    websocket_url: config.get('websocket_url')
  })

  walletBot.start()

}

if (require.main === module) {

  start()

}
