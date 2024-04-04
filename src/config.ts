
import { config as dotenv } from 'dotenv'

dotenv()

import * as nconf from 'nconf'

import { homedir } from 'os'

nconf.env({
  parseValues: true  
})

const global_file = `/etc/walletbot/walletbot.json`

const user_file = `${homedir()}/.walletbot/walletbot.json`

const project_file = `${process.cwd()}/.walletbot/walletbot.json`

nconf.add('project_file', { type: 'file', file: project_file })

nconf.add('user_file', { type: 'file', file: user_file })

nconf.add('global_file', { type: 'file', file: global_file })

export function loadFromFiles() {

  nconf.use('project_file', { type: 'file', file: project_file })

  nconf.use('user_file', { type: 'file', file: user_file, })

  nconf.use('global_file', { type: 'file', file: global_file })

}

loadFromFiles()

process.on('SIGHUP', () => {

  loadFromFiles()

})

nconf.defaults({
  CONFIG: '/etc/wallet-bot/wallet-bot.json',
  HOST: '0.0.0.0',
  PORT: 5200,
  PROMETHEUS_ENABLED: true,
  AMQP_ENABLED: false,
  HTTP_API_ENABLED: true,
  SWAGGER_ENABLED: true,
  POSTGRES_ENABLED: false,
  AMQP_URL: 'amqp://guest:guest@rabbitmq:5672/walletbot',
  AMQP_EXCHANGE: 'walletbot',
  LOKI_ENABLED: false,
  LOKI_LABEL_APP: 'walletbot',
  API_BASE: 'https://walletbot.anypayx.com',
  wallets: [],
  WALLETBOT_WEBSOCKET_URL: 'wss://wss.walletbot.anypayx.com',
  btc_fee_rate: 'economyFee'
})

export default nconf


