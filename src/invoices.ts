
import axios from 'axios'

import anypay from './anypay'

import log from './log'

import { WalletBot } from './wallet_bot'

export async function listUnpaid(walletBot: WalletBot): Promise<any[]> {

  try {

    const url = `${walletBot.options.api_base}/v1/api/apps/wallet-bot/invoices?status=unpaid`

    let { data } = await axios.get(url, {
      auth: {
        username: walletBot.options.auth_token,
        password: ''
      }
    })

    if (data.invoices.length > 0) {
      console.log(`${data.invoices.length} unpaid invoices`)
    }

    return data.invoices

  } catch(error) {
    const { message } = error as Error
    console.log({ message })

    log.error('invoices.listUnpaid.error', message)

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
