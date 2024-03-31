
import { WebSocket } from 'ws'

export interface Handler<Req, Res> {
    (socket: WebSocket, json: Req): void | Res
}

export interface Handlers {
    [key: string]: Handler<any, any>
}
