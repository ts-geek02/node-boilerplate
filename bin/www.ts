#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '../app';
import debug from 'debug';
import http from 'http';

const debugServer = debug('linter-auto-backend:server');

/**
 * Get port from environment and store in Express.
 */

const port: string | number | false = normalizePort(
  process.env['PORT'] || '3000'
);
app.set('port', port);

/**
 * Create HTTP server.
 */

const server: http.Server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string): string | number | false {
  const port: number = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: Error & { code?: string; syscall?: string }): void {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind: string =
    typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      // eslint-disable-next-line no-process-exit
      process.exit(1);
    // eslint-disable-next-line no-fallthrough
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      // eslint-disable-next-line no-process-exit
      process.exit(1);
    // eslint-disable-next-line no-fallthrough
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(): void {
  const addr: string | AddressInfo | null = server.address();
  const bind: string =
    typeof addr === 'string'
      ? `pipe ${addr}`
      : `port ${(addr as AddressInfo).port}`;
  debugServer(`Listening on ${bind}`);
}

interface AddressInfo {
  port: number;
  family: string;
  address: string;
}
