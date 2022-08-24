
import { connect, MnemonicWallet, config, log } from './'

export async function start() {

  const token = config.get('anypay_access_token')

  if (token) {

    connect(token)

  } else {

    log.error(`anypay_access_token config variable not set`)

    log.error(`Please visit https://anypayx.com/dashboard/apps/wallet-bot to get your token`)

    process.exit(1)

  }

  const mnemonic = config.get('wallet_bot_backup_seed_phrase')

  if (mnemonic) {

    const mnemonicWallet = new MnemonicWallet(mnemonic)

    for (let wallet of mnemonicWallet.wallets) {

      log.info(wallet)

    }

  } else {

    log.error('no wallet_bot_backup_seed_phrase config variable set')

    log.error("Please run `docker run wallet-bot seed-phrase` to generate a new empty wallet")

    process.exit(1)

  }

}

if (require.main === module) {

  start()

}
