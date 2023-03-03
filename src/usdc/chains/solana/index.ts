
/**
 *
 * Solana Resources:
 *
 * - https://graphql.bitquery.io/user/api_key
 * - https://bitquery.io/blog/solana-api
 * - https://github.com/solana-labs/solana-web3.js/
 * - https://solanacookbook.com/#contributing
 * - https://www.quicknode.com/guides/solana-development/spl-tokens/how-to-transfer-spl-tokens-on-solana/
 *
 */

import * as bip39 from 'bip39'

import { Keypair, PublicKey } from '@solana/web3.js'

import { CovalentTokenBalanceResponseItem } from '../polygon'

import axios from 'axios'

import BigNumber from 'bignumber.js'

import { SolanaPayment } from './payment'

/**
 * Fetches the token balances from a Solana blockchain provider. It is designed to support
 * native assets on Solana, specificially USDC.
 *
 */
export async function getTokenBalance(params: {address: string, asset: string}): Promise<number> {

  const covalentChainID = 1399811149

  const url = `https://api.covalenthq.com/v1/${covalentChainID}/address/${params.address}/balances_v2/`

  const { data } = await axios.get(url, {
    auth: {
      username: String(process.env.covalent_api_key),
      password: ''
    }
  })

  for (let item of data.data.items) { console.log(item) }

  const contract = data.data.items.find((item: CovalentTokenBalanceResponseItem) => item.contract_address === params.asset)

  if (!contract) { return 0 }

  return new BigNumber(`${contract.balance}e-${contract.contract_decimals}`).toNumber()

}

/** 
 * # USD Coin (Solana Asset) (USDC)
 *
 * USD Coin is astablecoin brought to you by Circle and Coinbase. It is issued by regulated and licensed financial institutions that maintain full reserves of the equivalent fiat currency.
 *
 * Solana USDC launched in January 2021 and already has extensive adoption across leading crypto exchanges, DeFi ecosystems, such as Raydium and Mango Markets, creator platforms, such as Audius, NFT marketplaces like Metaplex, and several native wallets, including Phantom, SolFare, Exodus and Binance’s highly popular Trust Wallet.  The Solana network has several powerful tools, including Wormhole, a secure, decentralized bridge connecting it to Ethereum. The Solana ecosystem is robust, with more than 80 projects and millions of users. With Solana USDC, developers can build on this ecosystem and access Circle’s full suite of payments and treasury infrastructure built around USDC.
 *
 *
 * The contract address for USDC on Solana is EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v and more information may be
 * found on the [Solana USDC Blockchain
 * Explorer](https://explorer.solana.com/address/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v)
 *
 * Current total supply according to centre.io: 5,034,954,019.965219
 *
 * - https://solscan.io/token/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
 * - https://blog.liquid.com/solana-usdc
 * - https://www.circle.com/en/usdc-multichain/solana
 *
 */
export async function getUSDCBalance(params: {address: string}): Promise<number> {

  return getTokenBalance({
    asset: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', //TODO Get Actual Contract Hash Not 'USDC'
    address: params.address
  })

}

/**
 * Fetches the SOL balance from a Solana blockchain provider. 
 *
 */
export async function getGasBalance(params: {address: string}): Promise<number> {

  return getTokenBalance({
    asset: '11111111111111111111111111111111',
    address: params.address
  })

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


/**
 * Returns a new randomly-generated address that cannot receive funds
 * because the private key is not returned
 *
 */
export function getAddressFromMnemonic({ mnemonic }: {mnemonic: string }): string {

  const seed = bip39.mnemonicToSeedSync(mnemonic, ""); // (mnemonic, password)
  const keypair = Keypair.fromSeed(seed.slice(0, 32));

  return keypair.publicKey.toString()

}
/**
 * Determines whether a string is or is not a valid Ethereum address 
 */
export function isAddress({ address }: {address: string }): boolean {

  try {

    const keypair = new PublicKey(address)

    return !!keypair

  } catch(error) {

    return false

  }
  
}

/**
 * 
 * Parses a USDC transfer transaction on Solana
 * 
 */
export async function parseUSDCTransaction({ txhex }: { txhex: string}): Promise<any> {

  const payment = new SolanaPayment(txhex)

  console.log(payment.outputs, 'payment.outputs')

  console.log(payment.references, 'payment.references')

  return payment

}
