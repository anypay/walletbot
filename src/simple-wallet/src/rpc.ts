require('dotenv').config()

import * as bsv from './assets/bsv/rpc'
import * as bch from './assets/bch/rpc'
import * as dash from './assets/dash/rpc'
import * as ltc from './assets/ltc/rpc'
import * as doge from './assets/doge/rpc'
import * as btc from './assets/btc/rpc'
import * as xmr from './assets/xmr'

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
      return xmr.rpc
    default:
      throw new Error('rpc for currency not found')
  }

}

