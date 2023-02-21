
/**
 * 
 * Algorand Resources:
 * 
 * - https://github.com/algorand/js-algorand-sdk
 * 
 */

import * as algosdk from 'algosdk';



/**
 * Fetches the token balances from a Algorand blockchain provider. It is designed to support
 * native assets on Algorand, specificially USDC.
 *
 */
export async function getTokenBalance(params: {address: string, asset: string}): Promise<number> {

  let balance: number = 0

  return balance; // TODO: Actually get balance

}

/** 
 * # USD Coin (Algorand Asset) (USDC)
 *
 * USD Coin is astablecoin brought to you by Circle and Coinbase. It is issued by regulated and licensed financial institutions that maintain full reserves of the equivalent fiat currency.
 *
 * Launched in late 2020, Algorand USDC serves as a foundation for fast, low-cost, simple movement of funds across traditional banks, card networks and digital dollars on the Algorand blockchain. It has scaled quickly, with more than 200 million Algorand USDC in circulation as of September 2021. With partners like crypto broker Floating Point Group already supporting Algorand USDC, the network is robust and continuing to grow.
 *
 *
 * The asset id for USDC on Algorand is 31566704 and more information may be
 * found on the [Algorand USDC Blockchain
 * Explorer](https://algoexplorer.io/asset/31566704)
 *
 * Current total supply according to centre.io: 124,908,925.000293
 *
 * - https://algoexplorer.io/asset/31566704:23
 * w
 * - https://www.circle.com/en/usdc-multichain/algorand
 *
 */
export async function getUSDCBalance(params: {address: string}): Promise<number> {

  return getTokenBalance({
    asset: '31566704',
    address: params.address
  })

}

/**
 * Fetches the ALGO balance from a Algorand blockchain provider. 
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

  const {
    sk: senderPrivateKey,
    addr: senderAddress,
  } = algosdk.generateAccount();

  console.log({ senderPrivateKey })

  return senderAddress

}

