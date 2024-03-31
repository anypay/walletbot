
import { config } from './'

import { WalletBot } from './wallet_bot'

import { Command } from 'commander'

const program = new Command()

const { version } = require('../package')

program
  .name('walletbot')
  .version(version)
  .option('-s --seed-phrase <seed_phrase>', '12-work seed phrase for wallet bot')
  .option('-t --auth-token <auth_token>', 'anypay api auth token for wallet bot')

program
  .command('start')
  .action(async () => {

    const options = program.opts();

    const AUTH_TOKEN = config.get("walletbot_auth_token");

    const walletBot = new WalletBot({
      seed_phrase: options.seedPhrase || config.get('walletbot_seed_phrase'),
      anypay_token: options.authToken || config.get('walletbot_auth_token'),
      http_api_enabled: config.get('http_api_enabled'),
      websocket_enabled: true,
      websocket_url: config.get('websocket_url')
    })

    walletBot.start()

  })

import { generateMnemonic } from 'bip39'
import { listBalances } from './balances'

program
  .command('seed-phrase')
  .action(() => {

    const mnemonic = generateMnemonic()

    console.log(mnemonic)
  })

program
  .command('list-balances')
  .action(async () => {
    const balances = await listBalances()

    console.log(balances)
  })
  
  program.parse(process.argv)

