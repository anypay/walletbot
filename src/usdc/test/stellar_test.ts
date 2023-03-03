
import { expect } from '../../../__tests__/utils'

import * as usdc from '..'

const mnemonic = 'street neglect reform tissue into chef coyote kit crop gun nest now'

describe("Stellar USDC", () => {

  describe("Loading USDC Wallet on Stellar from Seed Phrase", () => {

    it('should return the wallet address given a mnemonic phrase', () => {

      const address = usdc.stellar.getAddressFromMnemonic({ mnemonic })

      console.log(address)

      expect(address).to.be.a('string')

      expect(String(address).length).to.be.greaterThan(0)

    })

    it('should validate a wallet address', () => {

      const address = usdc.stellar.getAddressFromMnemonic({ mnemonic })

      const isValid = usdc.stellar.isAddress({ address })

      expect(isValid).to.be.equal(true)

      const invalidIsValid = usdc.stellar.isAddress({ address: '12345' })

      expect(invalidIsValid).to.be.equal(false)

    })

  })

  describe("Getting Stellar Wallet Balances", async () => {

    it('should get the USDC wallet balance as zero for an empty wallet', async () => {

      try {

        const address = usdc.stellar.getAddressFromMnemonic({ mnemonic })

        const balance = await usdc.stellar.getUSDCBalance({ address })

        expect(balance).to.be.equal(0)

      } catch(error) {

        console.error(error)

      }

    })

    it('should get the USDC wallet balance for a non-empty wallet', async () => {

      const address = 'GA6DN27AG5FTVGUFPCUHCKJ6KOK33FL5GED3K7QD2FSN6HCXW3G4BGXP'

      const balance = await usdc.stellar.getUSDCBalance({ address })

      console.log({ balance, address })

      expect(balance).to.be.greaterThan(0)

    })

    it('should get the XLM wallet balance for a non-empty wallet', async () => {

      const address = 'GA6DN27AG5FTVGUFPCUHCKJ6KOK33FL5GED3K7QD2FSN6HCXW3G4BGXP'

      const balance = await usdc.stellar.getGasBalance({ address })

      console.log({ balance, address })

      expect(balance).to.be.greaterThan(0)

    })

  })

  describe("Building USDC Transactions", () => {

    it('should build and sign a USDC transaction', async () => {

      const transaction = await usdc.stellar.buildUSDCTransfer({
        mnemonic,
        to: 'GA6DN27AG5FTVGUFPCUHCKJ6KOK33FL5GED3K7QD2FSN6HCXW3G4BGXP',
        amount: 1
      })

      console.log(transaction, 'stellar.transaction')
      
    })
  })

})
