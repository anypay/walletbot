
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

import StellarSdk from 'stellar-sdk'

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

export function getKeypairFromMnemonic({ mnemonic }: {mnemonic: string }): Keypair {
  
  var seed: Buffer = mnemonicToSeedSync(mnemonic)

  seed = Buffer.from(seed.toString('hex').slice(0, 32))

  const bytes: Buffer = randomBytes(32);

  const keypair = Keypair.fromRawEd25519Seed(seed)

  return keypair

}

/**
 * Determines whether a string is or is not a valid Polygon address 
 */
export function isAddress({ address }: {address: string }): boolean {

  return false

}

export async function parseUSDCTransaction({ txhex }: { txhex: string }): Promise<any> {

  const base64 = Buffer.from(txhex, 'hex').toString('base64')
  
  const envelope = StellarSdk.xdr.TransactionEnvelope.fromXDR(base64, 'base64')


}

export async function buildUSDCTransfer({
  mnemonic,
  to,
  amount
}: {
  mnemonic: string,
  to: string,
  amount: number
}) {
  
  // Derive Keypair object and public key (that starts with a G) from the secret
  const sourceKeypair = getKeypairFromMnemonic({ mnemonic })

  const sourcePublicKey = sourceKeypair.publicKey();

  // Configure StellarSdk to talk to the horizon instance hosted by Stellar.org
  // To use the live network, set the hostname to 'horizon.stellar.org'
  const server = new StellarSdk.Server('https://horizon.stellar.org');


  // Transactions require a valid sequence number that is specific to this account.
  // We can fetch the current sequence number for the source account from Horizon.
  const account = await server.loadAccount(sourcePublicKey);

  // Right now, there's one function that fetches the base fee.
  // In the future, we'll have functions that are smarter about suggesting fees,
  // e.g.: `fetchCheapFee`, `fetchAverageFee`, `fetchPriorityFee`, etc.
  const fee = await server.fetchBaseFee();

  const transaction = new StellarSdk.TransactionBuilder(account, { fee })
    // Add a payment operation to the transaction
    .addOperation(StellarSdk.Operation.payment({
      
      destination: to,

      asset: new StellarSdk.Asset('USDC', 'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN'),

      amount: amount.toString()
    }))
    // Make this transaction valid for the next 30 seconds only
    .setTimeout(30)
    // Uncomment to add a memo (https://www.stellar.org/developers/learn/concepts/transactions.html)
    // .addMemo(StellarSdk.Memo.text('Hello world!'))
    .build();

  // Sign this transaction with the secret key
  // NOTE: signing is transaction is network specific. Test network transactions
  // won't work in the public network. To switch networks, use the Network object
  // as explained above (look for StellarSdk.Network).
  transaction.sign(sourceKeypair);

  // Let's see the XDR (encoded in base64) of the transaction we just built
  console.log(transaction.toEnvelope().toXDR('base64'));

  return transaction.toEnvelope().toXDR('base64')
}