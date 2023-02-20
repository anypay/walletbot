/**
 * 
 * Polygon Resources:
 * 
 * - https://polygon.technology/solutions/polygon-pos/
 * - https://www.covalenthq.com/docs/api/#/0/0/USD/1
 * 
 * 
 */

import axios from 'axios'

import { getPosClient } from "./pos_client";

const usdc_token_address = '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'

/**
 * Fetches the token balances from a Polygon blockchain provider. It is designed to support
 * ERC-20 tokens on Polygon, specificially USDC.
 *
 */
export async function getTokenBalance(params: {address: string, asset: string}): Promise<number> {

  /*

  const posClient = await getPosClient({ address: params.address })

  const erc20ChildToken = posClient.erc20(params.asset);

  const balance = await erc20ChildToken.getBalance(params.address)

  return parseInt(balance);

  */

  const covalentChainID = 137

  const url = `https://api.covalenthq.com/v1/${covalentChainID}/address/${params.address}/balances_v2/`

  const { data } = await axios.get(url, {
    auth: {
      username: String(process.env.covalent_api_key),
      password: ''
    }
  })

  const usdc = data.data.items.find((item: any) => item.contract_address === params.asset)

  if (!usdc) { return 0 }

  return usdc.balance

}

/** 
 * # USD Coin (PoS) (USDC)
 *
 * USD Coin is an ERC-20 stablecoin brought to you by Circle and Coinbase. It is issued by regulated and licensed financial institutions that maintain full reserves of the equivalent fiat currency.
 *
 * The contract address for USDC on Polygon is 0x2791bca1f2de4661ed88a30c99a7a9449aa84174 and more information may be
 * found on the [Polygon USDC Blockchain
 * Explorer](https://polygonscan.com/token/0x2791bca1f2de4661ed88a30c99a7a9449aa84174)
 *
 *
 */
export async function getUSDCBalance(params: {address: string}): Promise<number> {

  return getTokenBalance({
    asset: usdc_token_address,
    address: params.address
  })

}

/**
 * Fetches the MATIC balances from a Polygon blockchain provider. 
 *
 */
export async function getGasBalance(params: {address: string}): Promise<number> {

  let balance: number = 0

  return balance; // TODO: Actually get balance

}

/**
 * Returns a new randomly-generated address that cannot receive funds
 * because the private key is not returned
 *
 */
export function newRandomAddress(): string {

  let address: string = '';

  return address;

}

export function getAddressFromMnemonic({ mnemonic }: { mnemonic: string }) {

}
