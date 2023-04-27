![](https://doge.bitcoinfiles.org/ea8205469186c12f6b23866d3ef50ab84f6f6b82dab43075e0229ab32ca6f5bc)

# Wallet Bot

Self-custody, headless wallet service that runs as a daemon process within your data center. It manages your software operation's private keys so that your apps can securely send payments on any peer to peer payments network.

## Installation and Setup

The application runs as a long-running process which should be managed by k8s, docker, or your system service manager such as systemd or similar. It may be run in a node.js environment or as an isolated docker container. The single process requires no additional services such as database servers to be run.


`docker pull anypay/wallet-bot`

## Setting Up Wallet Keys

```
echo wallet_bot_backup_seed_phrase=$(docker run anypay/wallet-bot npx seed-phrase) >> .env
```

```
docker run \
  --env-file=.env \
  anypay/wallet-bot start
```

You may also combine some variables from one method with others from the other method.
## Configuration

Wallets and system settings may be configured by a combination of json config files, environment variables, and command line flags. All variables may be provided by either of the config variations.

## Environment Variables

*required

| Variable name                         | Description                   |
|---------------------------------------|-------------------------------|
| anypay_access_token *                 | Wallet Bot Access Token from AnypayX.com |
| wallet_bot_backup_seed_phrase *	  		| Seed phrase generated by `npx seed-phrase` |


## Testing

To run tests run `npm run test`

## Development

To commit new code run `npm run commit`


