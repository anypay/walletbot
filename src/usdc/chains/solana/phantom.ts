import * as nacl from 'tweetnacl';

import * as bs58 from 'bs58';

import { TextEncoder } from 'text-encoding'

export function validateSignature(message: string, signature: string, publickey: string): Boolean {

  const encodedMessage = new TextEncoder().encode(message)

  return nacl.sign.detached.verify(encodedMessage, Buffer.from(signature, 'hex'), bs58.decode(publickey))

}