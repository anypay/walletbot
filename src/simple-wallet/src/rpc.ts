/*
    This file is part of Wallet Bot: https://github.com/anypay/walletbot
    Copyright (c) 2022 Anypay Inc, Steven Zeiler

    Permission to use, copy, modify, and/or distribute this software for any
    purpose  with  or without fee is hereby granted, provided that the above
    copyright notice and this permission notice appear in all copies.

    THE  SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
    WITH  REGARD  TO  THIS  SOFTWARE  INCLUDING  ALL  IMPLIED  WARRANTIES  OF
    MERCHANTABILITY  AND  FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
    ANY  SPECIAL ,  DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
    WHATSOEVER  RESULTING  FROM  LOSS  OF USE, DATA OR PROFITS, WHETHER IN AN
    ACTION  OF  CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
    OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/
//==============================================================================

require('dotenv').config()

import { rpc as bsv } from './assets/bsv'
import { rpc as bch } from './assets/bch'
import { rpc as dash } from './assets/dash'
import { rpc as ltc } from './assets/ltc'
import { rpc as doge } from './assets/doge'
import { rpc as btc } from './assets/btc'
import { rpc as xmr } from './assets/xmr'

export function getRPC(currency: string) {

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
    default:
      throw new Error('rpc for currency not found')
  }

}

