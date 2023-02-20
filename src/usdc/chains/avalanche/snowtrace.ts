
/**
 * # Snowtrace Blockchain Provider & Explorer for Avalanche
 *
 * https://docs.snowtrace.io/
 *
 * ```
 * import { avalance: { snowtrace } } from 'usdc'
 *
 * const snowt
 *
 * const { status, message, result } = snowtrace.getTokenBalance({
 *
 * })
 * 
 * ```
 *
 *
 */

import axios from 'axios'

export interface GetGasBalance {
  address: string;
}

export interface GasBalance {
  address: string;
  balance: number
}

export interface TokenBalance {
  contractaddress: string;
  address: string;
  balance: number;
}

export interface GetTokenBalance {
  contractaddress: string;
  address: string;
}

export class Snowtrace {

  apikey: string;

  constructor(params: { apikey: string }) {

    this.apikey = params.apikey

  }

  async getTokenBalance({ contractaddress, address }: GetTokenBalance): Promise<TokenBalance> {

    var url = `https://api.snowtrace.io/api?module=account&action=tokenbalance`

    url = `${url}&contractaddress=${contractaddress}&address=${address}`

    url = `${url}&tag=latest&apikey=${this.apikey}`

    const result = await axios.get(url)

    console.log('usdc.avalance.snowtrace.getTokenBalance.result', result)

    return {
      contractaddress,
      address,
      balance: 0
    }

  }

  async getGasBalance({ address }: GetGasBalance): Promise<GasBalance> {

    var url = `https://api.snowtrace.io/api?module=account&action=balance`

    url = `${url}&address=${address}&tag=latest&apikey=${this.apikey}`

    const result = await axios.get(url)

    console.log('usdc.avalance.snowtrace.getGasBalance.result', result)

    return {
      address,
      balance: 0
    }

  }

}

const snowtrace_api_key = process.env.snowtrace_api_key

const snowtrace = new Snowtrace({ apikey: snowtrace_api_key })

export default snowtrace

