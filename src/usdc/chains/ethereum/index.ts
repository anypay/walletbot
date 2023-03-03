require('dotenv').config()

/**
 *
 * Ethereum Resources:
 *
 * - https://hardhat.org/
 * - https://www.covalenthq.com/docs/api/#/0/0/USD/1
 * - https://docs.ethers.org/v5/getting-started/
 * - https://medium.com/@mehmetegemenalbayrak/send-erc20-tokens-with-javascript-and-ethers-js-a063df896f99
 * 
 * */

import axios from "axios"

import BigNumber from 'bignumber.js'

import { ethers } from 'ethers'

import ERC20_ABI from "./erc20_abi"

/**
 * Fetches the token balances from a Ethereum blockchain provider. It is designed to support
 * native assets on Ethereum, specificially USDC.
 *
 */
export async function getTokenBalance(params: {address: string, asset: string}): Promise<number> {

  const covalentChainID = 1

  const url = `https://api.covalenthq.com/v1/${covalentChainID}/address/${params.address}/balances_v2/`

  const { data } = await axios.get(url, {
    auth: {
      username: String(process.env.covalent_api_key),
      password: ''
    }
  })

  console.log('getTokenBalance.result', data)

  for (let item of data.data.items) {
    console.log(item)
  }

  const contract = data.data.items.find((item: any) => item.contract_address === params.asset)

  if (!contract) { return 0 }

  return new BigNumber(`${contract.balance}e-${contract.contract_decimals}`).toNumber()

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
    asset: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    address: params.address
  })

}

/**
 * Fetches the ETH balance from a Ethereum blockchain provider. 
 *
 */
export async function getGasBalance(params: {address: string}): Promise<number> {
  
  return getTokenBalance({
    asset: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    address: params.address
  })

}


/**
 * Returns a new randomly-generated address that cannot receive funds
 * because the private key is not returned
 *
 */
export function newRandomAddress(): string {

  let address = ethers.Wallet.createRandom().address

  return address;

}

/**
 * Returns a new randomly-generated address that cannot receive funds
 * because the private key is not returned
 *
 */
export function getAddressFromMnemonic({ mnemonic }: {mnemonic: string }): string {

  return ethers.Wallet.fromMnemonic(mnemonic).address ;

}
/**
 * Determines whether a string is or is not a valid Ethereum address 
 */
export function isAddress({ address }: {address: string }): boolean {

  return ethers.utils.isAddress(address) ;

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

  const provider = ethers.getDefaultProvider()

  const senderWallet = ethers.Wallet.fromMnemonic(mnemonic).connect(provider)

  const value = ethers.utils.parseUnits(amount.toString(), 6)

  const contract = new ethers.Contract('0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', ERC20_ABI, senderWallet);

  const result = await contract.transfer(to, value)

  return result
}

/**
 * 
 * Transmits the signed transaction to the Ethereum blockchain via a provider.
 */
export async function sendSignedTransaction({ signedTransaction }: { signedTransaction: string }): Promise<string> {

  return ''

}

export interface USDCTransaction {
  txid: string;
  txhex: string;
  to: string;
  from: string;
  value: number;  
  block_height?: number;
  block_hash?: string;
  block_time?: number;
  memo?: string;
}

export async function parseUSDCTransaction({ txhex }: { txhex: string }): Promise<USDCTransaction> {

  const transaction = ethers.utils.parseTransaction(txhex)

  if (transaction.to !== '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48') {
    throw new Error('Not a USDC Contract transaction')
  }

  const contractInterface = new ethers.utils.Interface(ERC20_ABI);

  const decoded = contractInterface.parseTransaction(transaction)

  if (decoded.name !== 'transfer') {
    throw new Error('Not a USDC transfer transaction')
  }

  const value = new BigNumber(decoded.args[1].toString()).dividedBy(1000000).toNumber()

  return {
    txid: String(transaction.hash),
    txhex,
    to: decoded.args[0],
    from: String(transaction.from),
    value
  }

}

import * as test from './test_data'

export { test }

