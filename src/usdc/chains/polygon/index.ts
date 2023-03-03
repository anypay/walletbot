
require('dotenv').config()

/**
 * 
 * Polygon Resources:
 * 
 * - https://polygon.technology/solutions/polygon-pos/
 * - https://www.covalenthq.com/docs/api/#/0/0/USD/1
 * - https://cointelegraph.com/blockchain-for-beginners/polygon-blockchain-explained-a-beginners-guide-to-matic
 * - https://github.com/maticnetwork/matic.js/
 * - https://wiki.polygon.technology/docs/develop/ethereum-polygon/matic-js/get-started/
 * 
 * 
 */

import axios from 'axios'

import { ethers } from 'ethers'

import BigNumber from 'bignumber.js'

import { getPosClient } from "./pos_client";
import ERC20_ABI from '../ethereum/erc20_abi';

const usdc_token_address = '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'

const matic_token_address = '0x0000000000000000000000000000000000001010'

const provider = new ethers.providers.JsonRpcProvider(process.env.infura_url_polygon)

export interface CovalentTokenBalanceResponseItem {
  contract_decimals: number;
  contract_name: string;
  contract_ticker_symbol: string;
  contract_address: string;
  supports_erc: string[];
  logo_url: string;
  last_transferred_at: string;
  native_token: boolean,
  type: string;
  balance: string;
  balance_24h: string;
  quote_rate: number;
  quote_rate_24h: number;
  quote: number;
  quote_24h: number;
  nft_data: any;
}

/**
 * Fetches the token balances from a Polygon blockchain provider. It is designed to support
 * ERC-20 tokens on Polygon, specificially USDC.
 *
 */
export async function getTokenBalance(params: {address: string, asset: string}): Promise<number> {

  /*

  const posClient = await getPosClient({ address: params.address })

  const erc20ChildToken = posClient.erc20(params.asset);

  const balance = await erc20ChildToken.getBalance(params.address)

  return parseInt(balance);

  */

  const covalentChainID = 137

  const url = `https://api.covalenthq.com/v1/${covalentChainID}/address/${params.address}/balances_v2/`

  const { data } = await axios.get(url, {
    auth: {
      username: String(process.env.covalent_api_key),
      password: ''
    }
  })

  const contract = data.data.items.find((item: CovalentTokenBalanceResponseItem) => item.contract_address === params.asset)

  if (!contract) { return 0 }

  return new BigNumber(`${contract.balance}e-${contract.contract_decimals}`).toNumber()

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
    asset: usdc_token_address,
    address: params.address
  })

}

/**
 * Fetches the MATIC balances from a Polygon blockchain provider. 
 *
 */
export async function getGasBalance(params: {address: string}): Promise<number> {

  return getTokenBalance({
    asset: matic_token_address,
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
 * Determines whether a string is or is not a valid Polygon address 
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

  const senderWallet = ethers.Wallet.fromMnemonic(mnemonic).connect(provider)

  const value = ethers.utils.parseUnits(amount.toString(), 6)

  const contract = new ethers.Contract('0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e', ERC20_ABI, senderWallet);

  const result = await contract.transfer(to, value)

  return result
}
