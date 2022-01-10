import {createHttpServer} from './server'
import type {FastifyInstance} from 'fastify'


export {createHttpServer}

declare function _router(fastify: FastifyInstance): Promise<any>

export type router = typeof _router