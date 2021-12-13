import {fastify} from 'fastify'
import fastifySwagger from 'fastify-swagger'
import {router as userRouter} from 'app/user'


export function createHttpServer() {
  const server = fastify({trustProxy: true})

  server
    .register(fastifySwagger, {})
    .register(userRouter.v1, {prefix: '/api/v1'})

  return server
}