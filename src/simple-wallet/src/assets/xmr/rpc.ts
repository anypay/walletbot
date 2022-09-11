require('dotenv').config()

import axios from 'axios'

import BigNumber from 'bignumber.js'

export interface UTXO {
  txid: string;
  vout: number;
  address: string;
  account: string;
  scriptPubKey: string;
  amount: number;
  confirmations: number;
  spendable: boolean;
  solvable: boolean;
  safe: boolean;
}

interface RpcOptions {
  url: string;
}

export class RpcClient {

  url: string;

  constructor(params: RpcOptions) {

    this.url = params.url
  }

  async getBalance(address): Promise<any> {

    const method = 'get_balance'

    const params = {
      "account_index":0,
      "address_indices":[0,1]
    }

    let { data } = await axios.post(this.url, {method,params}, {
      auth: {
        username: process.env.XMR_RPC_USER,
        password: process.env.XMR_RPC_PASSWORD
      }
    })

    let { balance } = data.result

    balance = new BigNumber(data.result.balance).dividedBy(1000000000000).toNumber()

    return { asset: 'XMR', amount: balance }

  }

  async listUnspent(address: string): Promise<UTXO[]> {

    let method = 'listunspent'

    //let params = [0, 9999999, `["${address}"]`]
    let params = [0, 9999999, [address]]

    let { data } = await axios.post(this.url, {method,params}, {
      auth: {
        username: process.env.XMR_RPC_USER,
        password: process.env.XMR_RPC_PASSWORD
      }
    })

    return data.result

  }

  async sendRawTransaction({ tx_as_hex }: { tx_as_hex: string }): Promise<any> {

    const method = 'send_raw_transaction'

    const params = { tx_as_hex }

    const { data } = await axios.post(this.url, params)

    return data

  }

  async submitTransfer({ tx_as_hex }: { tx_as_hex: string }): Promise<any> {

    const method = 'submit_transfer'

    const params = { tx_as_hex }

    const { data } = await axios.post(`http://67.223.119.106:18081`, params)

    return data

  }

}

export async function listUnspent(address): Promise<UTXO[]> {

  let rpc = new RpcClient({
    url: process.env.XMR_RPC_URL
  })

  return rpc.listUnspent(address)

}

import { Balance } from '../../wallet'

export async function getBalance(address): Promise<Balance> {

  let rpc = new RpcClient({
    url: process.env.XMR_RPC_URL
  })

  return rpc.getBalance(address)

}



