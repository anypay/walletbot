
/**
 * 
 * Tron Resources:
 * 
 * - https://developers.tron.network/reference/tronweb-sendtoken 
 * - https://tron.network/usdc
 * - https://tronscan.org/#/contract/TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8/code
 * - https://developers.tron.network/reference/tronweb-sendtoken
 *
 */

import * as tronWeb from 'tronweb'

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
 * Derives the Stellar Address from Bip39 Seed Phrase
 *
 */
export function getAddressFromMnemonic({ mnemonic }: {mnemonic: string }): string {
  
  const { privateKey, publicKey, address } = tronWeb.fromMnemonic(mnemonic)

  return address

}

export function getKeypairFromMnemonic({ mnemonic }: {mnemonic: string }): { privateKey: string, publicKey: string, address: string} {
  
  return tronWeb.fromMnemonic(mnemonic)

}

/**
 * Returns a new randomly-generated address that cannot receive funds
 * because the private key is not returned
 *
 */
export function newRandomAddress(): string {

  let address: string = tronWeb.createRandom().address;

  return address;

}

export function isAddress({ address }: { address: string }): boolean {

  return false;

}

/**
 * 
 * Builds a new signed transaction to send USDC to a given address given the wallet private key.
 * This function does not transmit or broadcast the transaction and therefore no gas will
 * be spent until the transaction is sent by a subsequent call to sendSignedTransaction.
 * 
 * Example ERC20 Transfer: https://etherscan.io/tx/0xeda0433ebbb12256ef1c4ab0278ea0c71de4832b7edd65501cc445794ad1f46c
 * 
 */
export async function buildUSDCTransfer({ mnemonic, to, amount, memo }: { mnemonic: string, to: string, amount: number, memo?: string}): Promise<string> {

  const result = await tronWeb.transactionBuilder.sendToken(
    to,
    amount,
    'TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8',
    getAddressFromMnemonic({ mnemonic })
  );

  console.log(result, 'tron.buildUSDCTransfer.result')

  return result

}


