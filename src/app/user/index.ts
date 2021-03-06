import {UserModel} from './UserModel'
import {UserRepository} from './UserRepository'
import {UserService} from './UserService'
import {routes} from './routes'
import * as Session from './packages/session'
import * as error from './user-error'
import * as schemas from './schemas'
import {UserRole} from './UserRole'
import type {FastifyInstance} from 'fastify'


export const service = new UserService(new UserRepository(UserModel), Session.service)
export const router = async function router(fastify: FastifyInstance) {
  return routes(fastify, service, schemas)
}
export {
  UserRole,
  Session,
  error
}