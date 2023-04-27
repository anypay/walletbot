require('dotenv').config()

import { rpc as bsv } from './assets/bsv'
import { rpc as bch } from './assets/bch'
import { rpc as dash } from './assets/dash'
import { rpc as ltc } from './assets/ltc'
import { rpc as doge } from './assets/doge'
import { rpc as btc } from './assets/btc'
import { rpc as xmr } from './assets/xmr'

import { rpc as matic } from './assets/matic'
import { rpc as eth } from './assets/eth'
import { rpc as avax } from './assets/avax'

import { rpc as matic_usdc } from './assets/matic.usdc'
import { rpc as eth_usdc } from './assets/eth.usdc'
import { rpc as avax_usdc } from './assets/avax.usdc'

import { rpc as matic_usdt } from './assets/matic.usdt'
import { rpc as eth_usdt } from './assets/eth.usdt'
import { rpc as avax_usdt } from './assets/avax.usdt'

export function getRPC(currency) {

  switch(currency) {
    case 'BSV':
      return bsv
    case 'BCH':
      return bch
    case 'BTC':
      return btc
    case 'LTC':
      return ltc
    case 'DASH':
      return dash
    case 'DOGE':
      return doge
    case 'XMR':
      return xmr;
    case 'MATIC':
      return matic;
    case 'ETH':
      return eth;
    case 'AVAX':
      return avax;
    case 'MATIC.USDC':
      return matic_usdc;
    case 'ETH.USDC':
      return eth_usdc;
    case 'AVAX.USDC':
      return avax_usdc;
    case 'MATIC.USDT':
      return matic_usdt;
    case 'ETH.USDT':
      return eth_usdt;
    case 'AVAX.USDT':
      return avax_usdt;
    default:
      return {};
      //throw new Error('rpc for currency not found')
  }

}

