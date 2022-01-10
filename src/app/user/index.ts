import {UserModel} from './UserModel'
import {UserRepository} from './UserRepository'
import {UserService} from './UserService'
import {routes} from './routes'
import {initSession} from './packages/session'
import * as error from './user-error'
import * as schemas from './schemas'
import {UserRole} from './UserRole'
import type {Session} from './packages/session'
import type {FastifyInstance} from 'fastify'
import type {router} from 'servers/http'


export interface User {
  Session: Session,
  service: UserService,
  error: typeof import('./user-error'),
  UserRole: typeof UserRole,
  router: router
}


export async function initUser(): Promise<User> {
  const Session = await initSession()
  const service = new UserService(new UserRepository(UserModel), Session.service)
  await service.upsertSuperadmin()

  return {
    Session,
    service,
    error,
    UserRole,
    router: async function router(fastify: FastifyInstance) {
      await routes(fastify, service, schemas)
    }
  }
}