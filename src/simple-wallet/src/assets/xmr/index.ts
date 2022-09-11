
/*const WalletManager = require('@mymonero/mymonero-wallet-manager')({})

const walletManager = new WalletManager('STAGENET', 'https://stagenet-api.mymonero.rtfm.net')

walletManager.init()
  .then(() => console.log('mymonero.walletmanger.initialized'))
  .catch((error) => console.error('mymonero.walletmanger.init.failed', error))

*/

import axios from 'axios'

import { Client } from 'payment-protocol'

const bitcore = {

}

export { bitcore }

import * as rpc from './rpc'

export { rpc }

interface Instruction {
  outputs: Destination[];
}

export interface PaymentRequest {
  paymentUrl: string;
  instructions: Instruction[];
}

export interface BuiltPayment {
  tx_blob: string;
  tx_key: string;
  tx_hash: string;
}

export async function buildPaymentFromURL(paymentRequest: PaymentRequest): Promise<BuiltPayment> {

  let client = new Client(paymentRequest.paymentUrl)

  let result = await client.paymentRequest({
    chain: 'XMR',
    currency: 'XMR'
  })

  return buildPayment(result)

}

export async function buildPayment(paymentRequest: PaymentRequest): Promise<BuiltPayment> {

  let destinations = paymentRequest.instructions[0].outputs

  try {

    const transferResult = await transfer(destinations)

    let { tx_blob, tx_key, tx_hash } =  transferResult

    return { tx_blob, tx_key, tx_hash }
  
  } catch(error) {

    console.error('xmr.transfer.error', error)

    throw error
  }

}

export async function call(method: string, params: any): Promise<any> {

  let { data } = await axios.post(process.env.XMR_RPC_URL, {
    jsonrpc:"2.0",
    id:"0",
    method,
    params
  }, {
    auth: {
      username: process.env.XMR_RPC_USER,
      password: process.env.XMR_RPC_PASSWORD
    }
  })

  if (data.error) {

    console.error('xmr.rpc.call.error', data)

    throw new Error(data.error)

  }

  if (data.result) {

    return data.result

  } else {

    return data
  }

}

interface Destination {
  address: string;
  amount: number;
}

export async function transfer(destinations: Destination[]) {

  let result = await call('transfer', {
    get_tx_hex: true,
    get_tx_key: true,
    get_tx_metadata: true,
    do_not_relay: true,
    unlock_time: 0,
    destinations
  })

  return result

}



