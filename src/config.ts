
import { config as dotenv } from 'dotenv'

dotenv()

import * as nconf from 'nconf'

import { homedir } from 'os'

nconf.env({
  parseValues: true,
  transform
})

const global_file = `/etc/wallet-bot/wallet-bot.json`

const user_file = `${homedir()}/.wallet-bot/wallet-bot.json`

const project_file = `${process.cwd()}/.wallet-bot/wallet-bot.json`

nconf.add('project_file', { type: 'file', file: project_file, transform })

nconf.add('user_file', { type: 'file', file: user_file, transform })

nconf.add('global_file', { type: 'file', file: global_file, transform })

export function loadFromFiles() {

  nconf.use('project_file', { type: 'file', file: project_file, transform })

  nconf.use('user_file', { type: 'file', file: user_file, transform })

  nconf.use('global_file', { type: 'file', file: global_file, transform })

}

loadFromFiles()

process.on('SIGHUP', () => {

  loadFromFiles()

})

nconf.defaults({
  config: '/etc/wallet-bot/wallet-bot.json',
  HOST: '0.0.0.0',
  PORT: 5200,
  PROMETHEUS_ENABLED: true,
  amqp_enabled: false,
  http_api_enabled: true,
  swagger_enabled: true,
  postgres_enabled: false,
  amqp_url: 'amqp://guest:guest@rabbitmq:5672/walletbot',
  amqp_exchange: 'walletbot',
  loki_enabled: false,
  loki_label_app: 'walletbot',
  api_base: 'https://walletbot.anypayx.com',
  wallets: [],
  walletbot_websocket_url: 'wss://wss.walletbot.anypayx.com',
  btc_fee_rate: 'economyFee'
})

export default nconf

function transform(obj: { key: string, value: any }) {
  return {
    key: obj.key.toLowerCase(),
    value: obj.value
  }
}

