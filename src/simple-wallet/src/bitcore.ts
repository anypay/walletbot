
import { BigNumber } from 'bignumber.js';

import { join } from 'path'


const assets = require('require-all')({
  dirname: join(__dirname, 'assets'),
  filter      :  /\index.ts/,
  recursive: true
})

export function getBitcore(asset): any {

  let bitcore = assets[asset.toLowerCase()]['index.ts'].bitcore

  if (!bitcore) {

    throw new Error(`bitcore not available for ${asset}`)
  }

  return bitcore

}

export function toSatoshis(amount): number{
  let amt = new BigNumber(amount); 
  let scalar = new BigNumber(100000000);

  return amt.times(amount).toNumber();
}

