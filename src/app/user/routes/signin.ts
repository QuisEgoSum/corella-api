import type {FastifyInstance} from 'fastify'
import type {UserService} from 'app/user/UserService'
import type {UserCredentials} from 'app/user/schemas'
import {UserBase} from '../schemas/entities'
import {config} from '@config'


interface SigninUser {
  Body: UserCredentials
}

export async function signin(fastify: FastifyInstance, service: UserService, schemas: typeof import('app/user/schemas')) {
  return fastify
    .route<SigninUser>(
      {
        url: '/user/signin',
        method: 'POST',
        schema: {
          summary: 'User sing in',
          tags: ['User'],
          body: schemas.entities.UserCredentials,
          response: {
            [200]: {
              description: 'User',
              type: 'object',
              properties: {
                user: UserBase
              },
              additionalProperties: false,
              required: ['user']
            }
          }
        },
        handler: async function(request, reply) {
          const {user, sessionId} = await service.signin(request.body)

          reply
            .setCookie('sessionId', sessionId, config.user.session.cookie)
            .code(200)
            .type('application/json')
            .send({user})
        }
      }
    )
}