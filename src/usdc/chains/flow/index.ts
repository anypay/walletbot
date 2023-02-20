
import * as fcl from "@onflow/fcl";

/**
 * Fetches the token balances from a Flow blockchain provider. It is designed to support
 * native assets on Flow, specificially USDC.
 *
 */
export async function getTokenBalance(params: {address: string, asset: string}): Promise<number> {

  let balance: number = 0;

  return balance; // TODO: Actually get balance

}

/** 
 * # USD Coin (Flow Asset) (USDC)
 *
 * USD Coin is a stablecoin brought to you by Circle and Coinbase. It is issued by regulated and licensed financial institutions that maintain full reserves of the equivalent fiat currency.
 *
 * Flow is a scalable, developer-friendly Web3 platform originally created by Dapper Labs, a pioneer in the rapidly growing NFT space. From creating NFT collections to designing interactive gaming platforms, Flow’s programming language Cadence makes it easy for developers to build dApps to serve millions of users. With native support for USDC, Flow is enabling content creators and consumers to leverage the leading dollar digital currency for seamless payments across a wide-range of consumer NFT projects. Designed for performance, the Flow blockchain is built for global consumer use cases across sports, gaming, marketplaces, art, music, entertainment and more.
 *
 *
 * The contract id for USDC on Flow is A.b19436aae4d94622.FiatToken and more information may be
 * found on the [Flow USDC Blockchain
 * Explorer](https://flowscan.org/contract/A.b19436aae4d94622.FiatToken)
 *
 * - https://flowscan.org/contract/A.b19436aae4d94622.FiatToken
 * - https://www.circle.com/en/usdc-multichain/flow
 *
 */
export async function getUSDCBalance(params: {address: string}): Promise<number> {

  return getTokenBalance({
    asset: 'A.b19436aae4d94622.FiatToken',
    address: params.address
  })

}

/**
 * Fetches the FLOW balance from a Flow blockchain provider. 
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

  let address: string;

  return address;

}

