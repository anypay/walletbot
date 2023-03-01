
/**
 *
 * Stellar Resources:
 *
 * - https://github.com/reverbel/seed-phrases-for-stellar
 * - https://stellar.expert/explorer/public/asset/USDC-GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN
 * - https://github.com/reverbel/seed-phrases-for-stellar/blob/master/seed_phrases_for_stellar/seed_phrase_to_stellar_keys.py
 *
*/

import { randomBytes } from 'crypto'

import axios from 'axios'

import BigNumber from 'bignumber.js'

import { mnemonicToSeedSync } from 'bip39'

import { Keypair } from 'stellar-sdk'

/**
 * Fetches the token balances from a Stellar blockchain provider. It is designed to support
 * native assets on Stellar, specificially USDC.
 *
 */
export async function getTokenBalance(params: {address: string, asset: string, issuer: string}): Promise<number> {

  const { data } = await axios.get(`https://horizon.stellar.org/accounts/${params.address}`)

  const balance = data.balances.find(balance => {

    return balance.asset_issuer == params.issuer &&
           balance.asset_code == params.asset
  })

  if (!balance) {

    return 0

  }

  return new BigNumber(balance.balance).toNumber()

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
    address: params.address,
    asset: 'USDC',
    issuer: 'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN'
  })

}

/**
 * Fetches the XLM stellar lumens balances from a Stellar blockchain provider. 
 *
 */
export async function getGasBalance(params: {address: string}): Promise<number> {

  const { data } = await axios.get(`https://horizon.stellar.org/accounts/${params.address}`)

  const balance = data.balances.find(balance => balance.asset_type === 'native')

  if (!balance) {

    return 0

  }

  return new BigNumber(balance.balance).toNumber()

}

/**
 * Returns a new randomly-generated address that cannot receive funds
 * because the private key is not returned
 *
 */
export function newRandomAddress(): string {

  return Keypair.random().publicKey()

}

/**
 * Derives the Stellar Address from Bip39 Seed Phrase
 *
 */
export function getAddressFromMnemonic({ mnemonic }: {mnemonic: string }): string {
  
  var seed: Buffer = mnemonicToSeedSync(mnemonic)

  seed = Buffer.from(seed.toString('hex').slice(0, 32))

  const bytes: Buffer = randomBytes(32);

  const keypair = Keypair.fromRawEd25519Seed(seed)

  console.log('ADDRESS--', keypair.publicKey())

  return keypair.publicKey()

}

/**
 * Determines whether a string is or is not a valid Polygon address 
 */
export function isAddress({ address }: {address: string }): boolean {

  return false

}
