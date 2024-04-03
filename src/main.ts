
import { config } from './'

import { WalletBot, WalletBotOptions, default_walletbot_options } from './wallet_bot'

import { Command } from 'commander'

const program = new Command()

const { version } = require('../package')

program
  .name('walletbot')
  .version(version)
  .option('-s --seed-phrase <seed_phrase>', '12-work seed phrase for wallet bot')
  .option('-t --auth-token <auth_token>', 'anypay api auth token for wallet bot')
  .option('-a --api-base <api_base>', 'anypay api base url defaults to https://walletbot.anypayx.com')
  .option('-p --prometheus-enabled <prometheus_enabled>', 'enable prometheus metrics')
  .option('-w --websocket-url <websocket_url>', 'url for websockets connection to server')
  .option('-e --websocket-enabled <websocket_enabled>', 'true or false, connect to websocket server')

function parseBoolean(potential: string): boolean {
  if (potential === '0' || potential === 'false') {
    return false
  } else {
    return true
  }
}

program
  .command('start')
  .action(async () => {

    const options = program.opts();

    const seed_phrase = options.seedPhrase || config.get('walletbot_seed_phrase')

    if (!seed_phrase) {
      console.error('walletbot_seed_phrase environment variable or --seed-phrase command line option is required')
      process.exit(1)
    }

    const auth_token = options.authToken || config.get('walletbot_auth_token')

    if (!auth_token) {
      console.error('walletbot_auth_token environment variable or --auth-token command line option is required')
      process.exit(1)
    }

    const api_base = options.apiBase || config.get('walletbot_api_base')

    const websocket_url = options.websocketUrl || config.get('walletbot_websocket_url')

    const websocket_enabled: boolean = parseBoolean(options.websocketEnabled)

    console.log({ websocket_enabled })

    var http_api_enabled = options.prometheusEnabled

    if (options.prometheusEnabled === undefined) {

      http_api_enabled = false
    }

    console.log("CLI OPTIONS", options)

    console.log('DEFAULTS', default_walletbot_options)

    const wallet_bot_options: WalletBotOptions = Object.assign(default_walletbot_options, {
      seed_phrase,
      auth_token,
      api_base,
      http_api_enabled,
      websocket_enabled,
      websocket_url,
    })

    console.log({ wallet_bot_options })

    const walletBot = new WalletBot(wallet_bot_options)

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

    const options = program.opts();

    const seed_phrase = options.seedPhrase || config.get('walletbot_seed_phrase')

    if (!seed_phrase) {
      console.error('walletbot_seed_phrase environment variable or --seed-phrase command line option is required')
      process.exit(1)
    }

    const auth_token = options.authToken || config.get('walletbot_auth_token')

    if (!auth_token) {
      console.error('walletbot_auth_token environment variable or --auth-token command line option is required')
      process.exit(1)
    }

    const walletBot = new WalletBot({
      seed_phrase,
      auth_token,
      http_api_enabled: config.get('http_api_enabled'),
      websocket_enabled: true,
      websocket_url: config.get('websocket_url')
    })

    const balances = await walletBot.listBalances()

    console.log(balances)

  })
  
  program.parse(process.argv)

