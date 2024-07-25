import { WebSocket } from "ws"

import list_addresses from "./handlers/inventory_addresses"
import list_balances from "./handlers/inventory_balances"
import invoice_cancelled from "./handlers/invoice_cancelled"
import invoice_created from "./handlers/invoice_created"
import invoice_paid from "./handlers/invoice_paid"

import { Handlers } from "./handler"

const handlers: Handlers = {
  list_addresses,
  list_balances,
  invoice_cancelled,
  invoice_created,
  invoice_paid,
}

export { handlers }
