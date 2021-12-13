import {fastify} from 'fastify'
import fastifySwagger from 'fastify-swagger'


export function createServer() {
  const server = fastify({trustProxy: true})

  server
    .register(fastifySwagger, {})

  return server
}