import {routes} from './routes'
import type {FastifyInstance} from 'fastify'
import type {router} from 'servers/http'


interface Docs {
  swagger: typeof import('./swagger').swagger,
  router: router
}


export async function initDocs(): Promise<Docs> {
  return {
    swagger: (await import('./swagger')).swagger,
    router: async function router(fastify: FastifyInstance) {
      await routes(fastify)
    }
  }
}