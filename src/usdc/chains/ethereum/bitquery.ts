
const GetEthereumAddressBalances = `query GetEthereumAddressBalances {
  ethereum {
    address(address: {is: "0xdfd5293d8e347dfe59e90efd55b2956a1343963d"}) {
      balance
      balances {
        value
        currency {
          address
          name
          symbol
          tokenId
          tokenType
        }
      }
    }
  }
}`

