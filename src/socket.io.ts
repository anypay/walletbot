import { WebSocket } from 'ws';
import { Logform } from 'winston';
import config from './config';
import { log } from './log';
import { listBalances } from './websockets';
import { handlers, Log, Context } from './websockets/handlers';

let socket: WebSocket | undefined;

export { socket }

export async function connect(token?: string): Promise<WebSocket> {
  console.log('websocket.connect');

  if (!token) {
    token = config.get('anypay_access_token');
  }

  const host = config.get('socket_io_host') || 'wss://api.anypayx.com';

  log.info('socket.io.connect', {
    host,
    transports: ['websocket'],
    reconnectionDelayMax: config.get('socket_io_reconnection_delay_max'),
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  const websocket_url = config.get('socket_io_host');
  console.log("WEBSOCKET_URL", config.get('socket_io_host'))

  socket = new WebSocket(config.get('socket_io_host'), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  socket.on('open', async () => {
    log.info('socket.io.connected');
    const balances = await listBalances(socket!);
    for (let balance of balances) {
      console.log({ balance });
    }
  });

  socket.on('close', (event) => {
    log.info('socket.io.disconnected', event);
  });

  socket.on('error', (error: Error) => {
    log.info('socket.io.error', error);
    log.error('socket.io', error);
  });

  socket.on('ping', () => {
    log.info('ping');
  });

  socket.on('message', (data: WebSocket.Data) => {
    const message = JSON.parse(data.toString());
    const event = message.event;
    const handler = handlers[event];
    if (handler) {
      const log = new Log({ socket });
      const context: Context<any> = {
        socket,
        log,
        message,
      };
      handler(socket, context);
    }
  });

  return new Promise((resolve, reject) => {
    socket!.on('open', () => {
      resolve(socket!);
    });
    socket!.on('error', (error) => {
      reject(error);
    });
  });
}
