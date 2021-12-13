import {findUser} from './find-user'
import type {UserService} from 'app/user/UserService'
import type {FastifyInstance} from 'fastify'


export async function routes(fastify: FastifyInstance, userService: UserService, schemas: typeof import('app/user/schemas')) {
  return Promise.all([
    findUser(fastify, userService, schemas)
  ])
}