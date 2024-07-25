import * as Balances from "./handlers/balances"
import * as Payments from "./handlers/payments"
import * as Status from "./handlers/status"

import { Request, ResponseToolkit } from "@hapi/hapi"

interface Handler {
  [key: string]: (request: Request, h: ResponseToolkit) => void
}

interface Handlers {
  [key: string]: Handler
}

const handlers: Handlers = {
  Balances,
  Payments,
  Status,
}

export default handlers
