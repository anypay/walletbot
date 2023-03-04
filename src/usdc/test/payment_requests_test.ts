
import { expect } from '../../../__tests__/utils'

import * as usdc from '..'

const mnemonic = 'street neglect reform tissue into chef coyote kit crop gun nest now'

describe("USDC Payment Requests", () => {

  it ("should generate a payment request for multiple currencies", async () => {

    const template = [{
      chain: 'SOL',
      currency: 'USDC',
      to: [{
        address: 'Ef9ca7Uwkw9rrbdaWnUrrdMZJqPYykZ1dPLEv9yMpEjB',
        amount: 100
      }, {
        address: 'Ef9ca7Uwkw9rrbdaWnUrrdMZJqPYykZ1dPLEv9yMpEjB',
        amount: 0.10
      }]
    }, {
      chain: 'ETH',
      currency: 'USDC' ,
      to: [{
        address: '0xA77547a3fB82a5Fa4DB408144870B69c70906989',
        amount: 100
      }]
    }, {
      chain: 'AVAX',
      currency: 'USDC', 
      to: [{
        address: '0x4da4bcf92ab8160906e5123c52da6c61a165adc4',
        amount: 100
      }]
    }, {
      chain: 'XLM',
      currency: 'USDC',
      to: [{
        address: 'GA6DN27AG5FTVGUFPCUHCKJ6KOK33FL5GED3K7QD2FSN6HCXW3G4BGXP',
        amount: 100
      }, {
        address: 'GA6DN27AG5FTVGUFPCUHCKJ6KOK33FL5GED3K7QD2FSN6HCXW3G4BGXP',
        amount: 0.10
      }]
    }, {
      chain: 'MATIC',
      currency: 'USDC', 
      to: [{
        address: '0xf04386e8cf07c7761c9ee365e392ff275d1ebf55',
        amount: 100
      }]
    }, {
      chain: 'BSV',
      currency: 'USDC', 
      to: [{
        address: '196zrany993KR4otSFfzBRmGomg3usDCBS',
        amount: 100
      }, {
        address: '196zrany993KR4otSFfzBRmGomg3usDCBS',
        amount: 0.10
      }]
    }, {
      chain: 'TRON',
      currency: 'USDC', 
      to: [{
        address: 'TBhbDUxvnVkPYhPEDQtEY1ARvTwETLynyz',
        amount: 100
      }, {
        address: 'TBhbDUxvnVkPYhPEDQtEY1ARvTwETLynyz',
        amount: 0.10
      }]
    }]

    const paymentRequest = await usdc.request.create({ template })

    console.log(paymentRequest)

  })

  describe("USDC Payment Request on Ethereum", () => {

  })

  describe("USDC Payment Request on Solana", () => {

    it('should return valid multi-output payment request for solana', async () => {

      const template = [{
        chain: 'SOL',
        currency: 'USDC',
        to: [{
          address: 'Ef9ca7Uwkw9rrbdaWnUrrdMZJqPYykZ1dPLEv9yMpEjB',
          amount: 100
        }, {
          address: 'Ef9ca7Uwkw9rrbdaWnUrrdMZJqPYykZ1dPLEv9yMpEjB',
          amount: 0.10
        }]
      }]

      const request = await usdc.request.create({ template })

      const option = await usdc.request.option({ template, chain: 'SOL', currency: 'USDC' })

      expect(option.instructions.length === 2)

      for (let instruction of option.instructions) {

        expect(instruction.type === 'transaction')

        expect(instruction.value > 0)
        
        expect(instruction.to === 'Ef9ca7Uwkw9rrbdaWnUrrdMZJqPYykZ1dPLEv9yMpEjB')

      }

    })

  })

  describe("USDC Payment Request on Stellar", () => {

  })

  describe("USDC Payment Request on Tron", () => {

  })

  describe("USDC Payment Request on Bitcoin", () => {

  })

  describe("USDC Payment Request on Polygon", () => {

  })

  describe("USDC Payment Request on Avalanche", () => {

  })

})

