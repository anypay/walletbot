import { Utxo } from "./simple-wallet/src/wallet"

import config from "./config"

export async function listUnspent(
  coin: string,
  address: string,
): Promise<Utxo[]> {
  const key = config.get("CRYPTO_APIS_IO_API_KEY")

  return []
}
