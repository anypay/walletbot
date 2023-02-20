
/**
 * Fetches the token balances from a Stellar blockchain provider. It is designed to support
 * native assets on Stellar, specificially USDC.
 *
 */
export async function getTokenBalance(params: {address: string, asset: string}): Promise<number> {

  let balance: number = 0

  return balance; // TODO: Actually get balance

}

/** 
 * # USD Coin (Stellar Asset) (USDC)
 *
 * USD Coin is astablecoin brought to you by Circle and Coinbase. It is issued by regulated and licensed financial institutions that maintain full reserves of the equivalent fiat currency.
 *
 * Stellar USDC combines the power and inclusivity of the Stellar network with the world’s fastest-growing dollar digital currency. Stellar USDC enables seamless, near instant, low-cost cross-border payments, remittances and next-gen treasury management, and is already supported on many prominent projects. To date, Stellar USDC supply has already grown past $12 million, with a total payment volume of more than $7.7 billion and nearly 40,000 accounts with trustlines created.1
 *
 *
 * The contract address for USDC on Stellar is USDC-GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN-1 and more information may be
 * found on the [Stellar USDC Blockchain
 * Explorer](https://stellar.expert/explorer/public/asset/USDC-GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN-1)
 *
 * Current total supply according to centre.io: 123,115,908 USDC
 *
 * - https://www.prnewswire.com/news-releases/okcoin-becomes-first-us-exchange-to-integrate-stellar-usdc-301479320.html
 * - https://blog.liquid.com/stellar-usdc-on-liquid
 * - https://www.circle.com/en/usdc-multichain/stellar
 *
 */
export async function getUSDCBalance(params: {address: string}): Promise<number> {

  return getTokenBalance({
    asset: 'USDC-GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN-1',
    address: params.address
  })

}

/**
 * Fetches the XLM stellar lumens balances from a Stellar blockchain provider. 
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

