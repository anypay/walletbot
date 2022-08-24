
import { io, Socket } from "socket.io-client";

import config from './config'

import { log } from './log'

import { listBalances } from './websockets'

export async function connect(token?: string): Promise<Socket> {

  if (!token) {

    token = config.get('anypay_access_token')

  }

  log.info('socket.io.connect', {
    host: config.get('socket_io_host'),
    path: config.get('socket_io_path'),
    transports: ['websocket'],
    reconnectionDelayMax: config.get('socket_io_reconnection_delay_max'),
    extraHeaders: {
      "Authorization": `Bearer ${token}`
    }
  })

  const socket = io(config.get('socket_io_host'), {
    path: config.get('socket_io_path'),
    transports: ['websocket'],
    reconnectionDelayMax: config.get('socket_io_reconnection_delay_max'),
    extraHeaders: {
      "Authorization": `Bearer ${token}`
    }
  });

  socket.on('connect', () => {

    log.info('socket.io.connecteded')

    listBalances(socket)

  })

  socket.on('disconnect', (event) => {

    log.info('socket.io.disconnected', event)

  })

  socket.on('connect_error', (error: Error) => {

    log.info('socket.io.connect_error', error)

  })

  socket.on('error', (error) => {

    log.info('socket.io.error', error)

    log.error('socket.io', error)

  })

  socket.on('reconnect', (event) => {

    log.info('socket.io.reconnect', event)

  })

  socket.on('reconnect_attempt', (event) => {

    log.info('socket.io.reconnect_attempt', event)

  })

  socket.on('reconnect_error', (event) => {

    log.info('socket.io.reconnect_error', event)

  })

  socket.on('reconnect_failed', (event) => {

    log.info('socket.io.reconnect_failed', event)

  })

  socket.on('ping', () => {

    log.info('ping')

  })

  /*Object.keys(handlers).forEach(event => {

    socket.on(event, message => {
      handlers[event](socket, message)
    })

  })*/

  return socket

}
