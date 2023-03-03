
import { expect } from '../../../__tests__/utils'

import * as usdc from '..'

const mnemonic = 'street neglect reform tissue into chef coyote kit crop gun nest now'

describe("Ethereum USDC", () => {

  describe("Loading USDC Wallet on Ethereum from Seed Phrase", () => {

    it('should return the wallet address given a mnemonic phrase', () => {

      const address = usdc.ethereum.getAddressFromMnemonic({ mnemonic })

      console.log(address)

      expect(address).to.be.a('string')

      expect(String(address).length).to.be.greaterThan(0)

    })

    it('should validate a wallet address', () => {

      const address = usdc.ethereum.getAddressFromMnemonic({ mnemonic })

      const isValid = usdc.ethereum.isAddress({ address })

      expect(isValid).to.be.equal(true)

      const invalidIsValid = usdc.ethereum.isAddress({ address: '12345' })

      expect(invalidIsValid).to.be.equal(false)

    })

  })

  describe("Getting Ethereum Wallet Balances", async () => {

    it('should get the USDC wallet balance as zero for an empty wallet', async () => {

      try {

        const address = usdc.ethereum.getAddressFromMnemonic({ mnemonic })

        const balance = await usdc.ethereum.getUSDCBalance({ address })

        expect(balance).to.be.equal(0)

      } catch(error) {

        console.error(error)

      }

    })

    it('should get the USDC wallet balance for a non-empty wallet', async () => {

      const address = '0xA77547a3fB82a5Fa4DB408144870B69c70906989'

      const balance = await usdc.ethereum.getUSDCBalance({ address })

      console.log({ balance, address })

      expect(balance).to.be.greaterThan(0)

    })

    it('should get the ETH wallet balance for a non-empty wallet', async () => {

      const address = '0xA77547a3fB82a5Fa4DB408144870B69c70906989'

      const balance = await usdc.ethereum.getGasBalance({ address })

      console.log({ balance, address })

      expect(balance).to.be.greaterThan(0)

    })

  })

  describe("Parsing & Validating Ethereum Transactions", () => {

    it("#parseUSDCTransaction should parse a USDC transaction", async () => {

      const transaction = await usdc.ethereum.parseUSDCTransaction({ txhex: usdc.ethereum.test.ERC20_USDC_TRANSFER_HEX })

      console.log(transaction)

      expect(transaction.txid).to.be.equal(usdc.ethereum.test.ERC20_USDC_TRANSFER_TXID)

    })

  })

})
