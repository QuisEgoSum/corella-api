import {UserModel} from './UserModel'
import {UserRepository} from './UserRepository'
import {UserService} from './UserService'
import {routes} from './routes/v1'
import * as schemas from './schemas'
import type {FastifyInstance} from 'fastify'


export const service = new UserService(new UserRepository(UserModel))
export const router = {
  v1: async function router(fastify: FastifyInstance) {
    return routes(fastify, service, schemas)
  }
}