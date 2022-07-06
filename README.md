
# Anypay Wallet API Server

## Installation

To download and install dependencies run `npm install` 

### Command Line Program

To install the `anypay-wallet` command line program run `npm link` or `npm install --global anypay-wallet`

## Running

To run the API server run `npm start`

## Testing

To run tests run `npm run test`

## Development

To commit new code run `npm run commit`

## Configuration

Required variables:

- miner_private_key

## Docker

```
docker pull anypay/wallet

docker run -d --name anypay-wallet --env-file=.env

```

Configuration should be provided by a file mounted at `/etc/rabbi/rabbi.json`

For example:

```
{
  "miner_private_key": "KykNDEPueBZ5VKYHr1Wsw4G8aBnYzznqgDgrAfPhykeVfpuxfmN5",
  "postgres_enabled": false,
  "amqp_enabled": false
}
```


