require('dotenv').config()

import { Avalanche } from "avalanche"

import snowtrace from './snowtrace'

import axios from "axios";

import { ethers } from 'ethers'

import BigNumber from 'bignumber.js'

import ERC20_ABI from "../ethereum/erc20_abi";

import Web3 from 'web3'

const provider = new ethers.providers.JsonRpcProvider(process.env.infura_url_avalanche)

//demo address: 0xa76e9cdc466d90e5ee16ad0fde7bd54ee1f40c72

/**
 *
 * Avalanche Resources:
 *
 * - https://blog.logrocket.com/build-dapp-avalanche-complete-guide/
 * - https://docs.snowtrace.io/api-endpoints/accounts#get-a-list-of-erc20-token-transfer-events-by-address
 * - https://docs.avax.network/dapps/developer-toolchains/using-truffle-with-the-avalanche-c-chain
 *
 */


/**
 * Fetches the token balances from a Avalanche blockchain provider. It is designed to support
 * native assets on Avalanche, specificially USDC.
 *
 */
/**
 * Fetches the token balances from a Ethereum blockchain provider. It is designed to support
 * native assets on Ethereum, specificially USDC.
 *
 */
export async function getTokenBalance(params: {address: string, asset: string}): Promise<number> {

  const covalentChainID = 43114

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
 * # USD Coin (Avalanche ERC-20) (USDC)
 *
 * USD Coin is astablecoin brought to you by Circle and Coinbase. It is issued by regulated and licensed financial institutions that maintain full reserves of the equivalent fiat currency.
 *
 * Avalanche is an eco-friendly, decentralized smart contracts platform driving some of the most important projects across DeFi and NFTs. Since launching in September 2020, Avalanche has become one of the fastest-growing ecosystems in crypto, with more than 350 projects, 1,100 separate block-producing validators and over one million community members. Avalanche is compatible with Ethereum smart contracts and tooling, which enables Ethereum users and developers to quickly access and launch high-performance decentralized apps. Transactions on Avalanche are executed with low fees and near-instant finality. During the UN’s COP26 conference in November 2021, Avalanche announced it has become a net-zero carbon output blockchain, heralding a new era of sustainability in the blockchain ecosystem.
 *
 *
 * The contract address for USDC on Avalanche is 0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e and more information may be
 * found on the [Avalanche USDC Blockchain
 * Explorer](https://snowtrace.io/token/0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e)
 *
 * - https://snowtrace.io/token/0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e
 * - https://blog.liquid.com/avalanche-usdc
 * - https://www.circle.com/en/usdc-multichain/avalanche
 *
 */
export async function getUSDCBalance(params: {address: string}): Promise<number> {

  return getTokenBalance({
    asset: '0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664', //TODO Get Actual Contract Hash Not 'USDC'
    address: params.address
  })

}

/**
 * Fetches the AVA balance from a Avalanche blockchain provider. 
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

  let address: string = '';

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

  const senderWallet = ethers.Wallet.fromMnemonic(mnemonic).connect(provider)

  const value = ethers.utils.parseUnits(amount.toString(), 6)

  const contract = new ethers.Contract('0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e', ERC20_ABI, senderWallet);

  const result = await contract.transfer(to, value)

  return result
}
