
/**
 * Fetches the token balances from a Polygon blockchain provider. It is designed to support
 * ERC-20 tokens on Polygon, specificially USDC.
 *
 */
export async function getTokenBalance(params: {address: string, asset: string}): Promise<number> {

  let balance: number

  balance = 0 // TODO: Actually get balance

  return balance;

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
    asset: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    address: params.address
  })

}

/**
 * Fetches the MATIC balances from a Polygon blockchain provider. 
 *
 */
export async function getGasBalance(params: {address: string}): Promise<number> {

  let balance: number

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

