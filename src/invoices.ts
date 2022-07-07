
import axios from 'axios'

import config from './config'

const base = config.get('api_base')

export async function listUnpaid(): Promise<any[]> {

  let { data } = await axios.get(`${base}/v0/api/apps/wallet-bot/invoices`, {
    auth: {
      username: config.get('anypay_api_token'),
      password: ''
    }
  })

  return data.invoices

}
