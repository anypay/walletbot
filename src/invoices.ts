
import axios from 'axios'

import config from './config'

const base = config.get('api_base')

import { app } from 'anypay'

const anypay = app(config.get('anypay_access_token'))

export async function listUnpaid(): Promise<any[]> {

  let { data } = await axios.get(`${base}/v0/api/apps/wallet-bot/invoices`, {
    auth: {
      username: config.get('anypay_access_token'),
      password: ''
    }
  })

  return data.invoices

}

interface NewInvoice {
  currency: string;
  address: string;
  value: number;
  denomination: string;
}

export async function createInvoice(params: NewInvoice): Promise<any> {

  console.log({ params })

  const { currency, address, denomination, value } = params

  const paymentRequest = await anypay.request([{
    currency,
    to: [{
      address,
      amount: value,
      currency: denomination
    }]
  }])

  console.log(paymentRequest)

  return paymentRequest

}
