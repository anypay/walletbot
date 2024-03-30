
import { config } from './'

import { WalletBot } from './wallet_bot'

import { Command } from 'commander'

const program = new Command()

const { version } = require('../package')

program
  .name('walletbot')
  .version(version)
  .option('-s --seed-phrase <seed_phrase>', 'seed phrase for wallet bot')
  .option('-t --anypay-token <anypay_token>', 'anypay token for wallet bot')

program
  .command('start')
  .action(async () => {

    const options = program.opts();

    console.log(options)

    const walletBot = new WalletBot({
      seed_phrase: options.seedPhrase || config.get('wallet_bot_backup_seed_phrase'),
      anypay_token: options.anypayToken || config.get('anypay_access_token'),
      http_api_enabled: config.get('http_api_enabled'),
      websocket_enabled: true,
      websocket_url: config.get('websocket_url')
    })

    walletBot.start()

  })

import { generateMnemonic } from 'bip39'

program
  .command('seed-phrase')
  .action(() => {

    const mnemonic = generateMnemonic()

    console.log(mnemonic)
  })
  
  program.parse(process.argv)

