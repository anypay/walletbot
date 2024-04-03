import config from './config'

import { WalletBot, WalletBotOptions, default_walletbot_options } from './wallet_bot'

import { Command } from 'commander'

const program = new Command()

const { version } = require('../package')

program
  .name('walletbot')
  .version(version)
  .option('-s --seed-phrase <seed_phrase>', '12-work seed phrase for wallet bot')
  .option('-t --auth-token <auth_token>', 'anypay api auth token for wallet bot')
  .option('-a --api-base <api_base>', 'anypay walletbot backend api base url')
  .option('-p --prometheus-enabled <prometheus_enabled>', 'enable prometheus metrics')
  .option('-h --http-api-enabled <http_api_enabled>', 'server json data over http api to clients')
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

    var http_api_enabled = options.httpApiEnabled

    const newOptions = {
      seed_phrase,
      auth_token,
      api_base: api_base || default_walletbot_options.api_base,
      http_api_enabled: http_api_enabled || default_walletbot_options.http_api_enabled,
      websocket_enabled: websocket_enabled != undefined ? websocket_enabled : config.get('websocket_enabled'),
      websocket_url: websocket_url || default_walletbot_options.websocket_url
    }

    const wallet_bot_options: WalletBotOptions = {
      ...default_walletbot_options,
      ...newOptions,
      ...(newOptions.seed_phrase && { seed_phrase: newOptions.seed_phrase }),
      ...(newOptions.auth_token && { auth_token: newOptions.auth_token }),
      ...(newOptions.api_base && { api_base: newOptions.api_base }),
      ...(newOptions.http_api_enabled !== undefined && { http_api_enabled: newOptions.http_api_enabled }),
      ...(newOptions.websocket_enabled !== undefined && { websocket_enabled: newOptions.websocket_enabled }),
      ...(newOptions.websocket_url !== undefined && { websocket_url: newOptions.websocket_url })
    }

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

