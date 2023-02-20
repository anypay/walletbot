
/**
 * Fetches the token balances from a Tron blockchain provider. It is designed to support
 * native assets on Tron, specificially USDC.
 *
 */
export async function getTokenBalance(params: {address: string, asset: string}): Promise<number> {

  let balance: number = 0

  return balance; // TODO: Actually get balance

}

/** 
 * # USD Coin (TRC-20) (USDC)
 *
 * USD Coin is a stablecoin brought to you by Circle and Coinbase. It is issued by regulated and licensed financial institutions that maintain full reserves of the equivalent fiat currency.
 *
 * TRON USDC launched in June 2021 and already has seen significant growth and adoption, with more than $200 million of activity within a few months. TRON was built with high scalability, speed (up to 2,000 transactions per second) and availability. The TRON ecosystem is robust, with  nearly 2.5 billion transactions and more than 50 million total accounts.1


With TRON USDC, developers can build in this ecosystem and access Circle’s full suite of payments and treasury infrastructure built around USDC.
 *
 * The contract address for USDC on Tron is TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8 and more information may be
 * found on the [Tron USDC Blockchain
 * Explorer](https://tronscan.org/#/token20/TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8)
 *
 * Current total supply according to centre.io: 1,125,200,290.250000
 *
 * - https://tronscan.org/#/token20/TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8
 * - https://www.circle.com/en/usdc-multichain/tron
 *
 */
export async function getUSDCBalance(params: {address: string}): Promise<number> {

  return getTokenBalance({
    asset: 'TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8',
    address: params.address
  })

}

/**
 * Fetches the TRON balance from a Tron blockchain provider. 
 *
 */
export async function getGasBalance(params: {address: string}): Promise<number> {

  let balance: number = 0;

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

