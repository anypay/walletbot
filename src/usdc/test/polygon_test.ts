
import { expect } from '../../../__tests__/utils'

import * as usdc from '..'

const mnemonic = 'street neglect reform tissue into chef coyote kit crop gun nest now'

describe("Polgyon USDC", () => {

  describe("Loading USDC Wallet on Polygon from Seed Phrase", () => {

    it('should return the wallet address given a mnemonic phrase', () => {

      const address = usdc.polygon.getAddressFromMnemonic({ mnemonic })

      console.log(address)

      expect(address).to.be.a('string')

      expect(String(address).length).to.be.greaterThan(0)

    })

    it('should validate a wallet address', () => {

      const address = usdc.polygon.getAddressFromMnemonic({ mnemonic })

      const isValid = usdc.polygon.isAddress({ address })

      expect(isValid).to.be.equal(true)

      const invalidIsValid = usdc.polygon.isAddress({ address: '12345' })

      expect(invalidIsValid).to.be.equal(false)

    })

  })

  describe("Getting Polygon Wallet Balances", async () => {

    it('should get the USDC wallet balance as zero for an empty wallet', async () => {

      try {

        const address = usdc.polygon.getAddressFromMnemonic({ mnemonic })

        const balance = await usdc.polygon.getUSDCBalance({ address })

        expect(balance).to.be.equal(0)

      } catch(error) {

        console.error(error)

      }

    })

    it('should get the USDC wallet balance for a non-empty wallet', async () => {

      const address = '0xA77547a3fB82a5Fa4DB408144870B69c70906989'

      const balance = await usdc.polygon.getUSDCBalance({ address })

      console.log({ balance, address })

      expect(balance).to.be.greaterThan(0)

    })

    it('should get the MATIC wallet balance for a non-empty wallet', async () => {

      const address = '0xA77547a3fB82a5Fa4DB408144870B69c70906989'

      const balance = await usdc.polygon.getGasBalance({ address })

      console.log({ balance, address })

      expect(balance).to.be.greaterThan(0)

    })

  })

})
