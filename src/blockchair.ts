
import axios from 'axios'

import { v4 as uuid } from 'uuid'

import log from './log'


import { Balance } from './simple-wallet/src/wallet'

import config from './config'

export async function getAddress(coin: string, address: string) {

  const trace = uuid()

  try {

    log.debug('blockchair.api.dashboards.address', { address, coin, trace })

    const { data } = await axios.get(`https://api.blockchair.com/${coin.toLowerCase()}/dashboards/address/${address}`)

    log.debug('blockchair.api.dashboards.address.result', { trace, data })

    return data

  } catch(error) {

    log.debug('blockchair.api.dashboards.error', { error, trace })

    log.error('blockchair.api.dashboards', error)

  }

}

const currencies = {
  'BCH': 'bitcoin-cash',
  'BSV': 'bitcoin-sv',
  'BTC': 'bitcoin',
  'DASH': 'dash',
  'LTC': 'litecoin',
  'DOGE': 'dogecoin'
}

const key = config.get('blockchair_api_key')

export async function getBalance(asset: string, address: string): Promise<Balance> {

  const currency = currencies[asset]

  const { data } = await axios.get(`https://api.blockchair.com/${currency}/dashboards/address/${address}?key=${key}`)

  const { balance: value, balance_usd: value_usd } = data['data'][address]['address']

  const utxos = data['data'][address]['utxo']

  return { asset, address, value: parseFloat(value), value_usd: parseFloat(value_usd.toFixed(2)) }

}

export interface BlockchairUtxo {
  block_id: number;
  transaction_hash: string;
  index: number;
  value: number;
}

export async function listUnspent(asset: string, address: string): Promise<BlockchairUtxo[]> {

  const currency = currencies[asset]

  const { data } = await axios.get(`https://api.blockchair.com/${currency}/dashboards/address/${address}?key=${key}`)

  const utxos: BlockchairUtxo[] = data['data'][address]['utxo']

  return utxos

}
