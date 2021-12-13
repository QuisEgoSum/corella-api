import {findUserV1} from './find-user.v1'
import type {UserService} from 'app/user/UserService'
import type {FastifyInstance} from 'fastify'


export async function routes(fastify: FastifyInstance, userService: UserService) {
  return Promise.all([
    findUserV1(fastify, userService)
  ])
}