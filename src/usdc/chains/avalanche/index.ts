import { Avalanche } from "avalanche"

import snowtrace from './snowtrace'

/**
 *
 * Avalanche Resources:
 *
 * - https://blog.logrocket.com/build-dapp-avalanche-complete-guide/
 * - https://docs.snowtrace.io/api-endpoints/accounts#get-a-list-of-erc20-token-transfer-events-by-address
 *
 */


/**
 * Fetches the token balances from a Avalanche blockchain provider. It is designed to support
 * native assets on Avalanche, specificially USDC.
 *
 */
export async function getTokenBalance(params: {address: string, asset: string}): Promise<number> {

  const { balance } = await snowtrace.getTokenBalance({
    contractaddress: params.asset,
    address: params.address
  })

  return balance;

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
    asset: '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e', //TODO Get Actual Contract Hash Not 'USDC'
    address: params.address
  })

}

/**
 * Fetches the AVA balance from a Avalanche blockchain provider. 
 *
 */
export async function getGasBalance(params: {address: string}): Promise<number> {

  let balance: number

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

