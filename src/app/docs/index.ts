import {swagger} from './swagger'
import {FastifyInstance} from 'fastify'
import {routes} from './routes'


const router = async function router(fastify: FastifyInstance) {
  return routes(fastify)
}

export {
  swagger,
  router
}