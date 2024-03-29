
import axios from 'axios'

import config from './config'

const base = config.get('api_base') || 'https://api.anypayx.com'

import { log } from './log'

import anypay from './anypay'

export async function listUnpaid(): Promise<any[]> {

  try {

    const url = `${base}/v1/api/apps/wallet-bot/invoices?status=unpaid`

    console.log("LIST UNPAID URL", url)

    console.log("ACCESS TOKEN", config.get('anypay_access_token'))

    let { data } = await axios.get(url, {
      auth: {
        username: config.get('anypay_access_token'),
        password: ''
      }
    })
  
    return data.invoices

  } catch(error) {

    console.log(error.message)

    //log.error('invoices.listUnpaid.error', error)

    return []
  }

}

interface NewInvoice {
  currency: string;
  address: string;
  value: number;
  denomination: string;
}

export async function createInvoice(params: NewInvoice): Promise<any> {

  const { currency, address, denomination, value } = params

  const paymentRequest = await anypay.request([{
    currency,
    to: [{
      address,
      amount: value,
      currency: denomination
    }]
  }])

  return paymentRequest

}
