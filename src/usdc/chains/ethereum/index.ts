
/**
 *
 * Ethereum Resources:
 *
 * - https://hardhat.org/
 * */

/**
 * Fetches the token balances from a Ethereum blockchain provider. It is designed to support
 * native assets on Ethereum, specificially USDC.
 *
 */
export async function getTokenBalance(params: {address: string, asset: string}): Promise<number> {

  let balance: number = 0

  return balance; // TODO: Actually get balance

}

/** 
 * # USD Coin (ERC-20 Token) (USDC)
 *
 * USD Coin is a stablecoin brought to you by Circle and Coinbase. It is issued by regulated and licensed financial institutions that maintain full reserves of the equivalent fiat currency.
 *
 * Ethereum USDC is built on ERC-20, which is the most widely adopted standard in blockchain applications. Since its launch, Ethereum USDC has become a fundamental building block that exhibits deep liquidity and trading on venues and exchanges worldwide across both centralized and decentralized infrastructures.
 *
 *
 * The contract address for USDC on Ethereum is EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v and more information may be
 * found on the [Ethereum USDC Blockchain
 * Explorer](https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48)
 *
 * Current total supply according to centre.io: 5,034,954,019.965219
 *
 * - https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
 * - https://www.circle.com/en/usdc-multichain/ethereum
 *
 */
export async function getUSDCBalance(params: {address: string}): Promise<number> {

  return getTokenBalance({
    asset: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', //TODO Get Actual Contract Hash Not 'USDC'
    address: params.address
  })

}

/**
 * Fetches the ETH balance from a Ethereum blockchain provider. 
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

