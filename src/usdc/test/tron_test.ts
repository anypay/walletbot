
import { expect } from '../../../__tests__/utils'

import * as usdc from '..'

const mnemonic = 'street neglect reform tissue into chef coyote kit crop gun nest now'

describe("Tron USDC", () => {

  describe("Loading USDC Wallet on Tron from Seed Phrase", () => {

    it('should return the wallet address given a mnemonic phrase', () => {

      const address = usdc.tron.getAddressFromMnemonic({ mnemonic })

      console.log(address)

      expect(address).to.be.a('string')

      expect(String(address).length).to.be.greaterThan(0)

    })

    it('should validate a wallet address', () => {

      const address = usdc.tron.getAddressFromMnemonic({ mnemonic })

      const isValid = usdc.tron.isAddress({ address })

      expect(isValid).to.be.equal(true)

      const invalidIsValid = usdc.tron.isAddress({ address: '12345' })

      expect(invalidIsValid).to.be.equal(false)

    })

  })

  describe("Getting Tron Wallet Balances", async () => {

    it('should get the USDC wallet balance as zero for an empty wallet', async () => {

      try {

        const address = usdc.tron.getAddressFromMnemonic({ mnemonic })

        const balance = await usdc.tron.getUSDCBalance({ address })

        expect(balance).to.be.equal(0)

      } catch(error) {

        console.error(error)

      }

    })

    it('should get the USDC wallet balance for a non-empty wallet', async () => {

      const address = ''

      const balance = await usdc.tron.getUSDCBalance({ address })

      console.log({ balance, address })

      expect(balance).to.be.greaterThan(0)

    })

    it('should get the TRX wallet balance for a non-empty wallet', async () => {

      const address = ''

      const balance = await usdc.tron.getGasBalance({ address })

      console.log({ balance, address })

      expect(balance).to.be.greaterThan(0)

    })

  })

  describe("Building USDC Transactions", () => {

    it('should build and sign a USDC transaction', async () => {

      const transaction = await usdc.tron.buildUSDCTransfer({
        mnemonic,
        to: 'GA6DN27AG5FTVGUFPCUHCKJ6KOK33FL5GED3K7QD2FSN6HCXW3G4BGXP',
        amount: 1
      })

      console.log(transaction, 'tron.transaction')
      
    })
  })

})
