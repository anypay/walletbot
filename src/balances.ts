
require('dotenv').config()

import axios from 'axios';
import log from './log'

import { load as loadWallet } from './wallet'

interface Unspent {

}

export interface Balance {
  asset: string;
  value: number;
  usd_value?: number;
  last_updated?: Date;
  address?: string;
  unspent?: Unspent[];
}

interface UpdateAddressBalance {
  chain: string;
  currency: string;
  address: string;
  balance: number;
  usd_balance?: number;
}

export async function updateAddressBalance(params: UpdateAddressBalance): Promise<void> {

  const token = String(process.env.anypay_access_token)

  const api_base = `https://api.anypayx.com/v1/api/apps/wallet-bot`

  const { data } = await axios.put(`${api_base}/address-balances`, {
    chain: params.chain,
    currency: params.currency,
    address: params.address,
    balance: params.balance,
    usd_balance: params.usd_balance
  }, {
    auth: {
      username: token,
      password: ''
    }
  })

  log.info('updateAddressBalance.result', data)

}


export async function listBalances(): Promise<Balance[]> {

  const wallet = await loadWallet()

  const balances = await wallet.balances()

  for (let balance of balances) {

    log.info('balance', balance)
  }

  return balances

}

