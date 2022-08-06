
import axios from 'axios'

import { v4 as uuid } from 'uuid'

import log from './log'

export async function getBalance() {

}

export interface Address {
  
}

export async function getAddress(coin: string, address: string) {

  const trace = uuid()

  try {

    log.debug('blockchair.api.dashboards.address', { address, coin, trace })

    const { data } = await axios.get(`https://api.blockchair.com/${coin.toLowerCase()}/dashboards/address/${address}`)

    log.debug('blockchair.api.dashboards.address.result', { trace, data })

    return data

  } catch(error) {

    log.debug('blockchair.api.dashboards.error', { error, trace })

    log.error('blockchair.api.dashboards', error)

  }


}
