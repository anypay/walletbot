import { Request, ResponseToolkit } from "@hapi/hapi"

export async function index(_: Request, h: ResponseToolkit) {
  return h.response({ success: true }).code(200)
}
