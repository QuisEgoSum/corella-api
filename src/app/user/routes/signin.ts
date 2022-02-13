import {config} from '@config'
import type {FastifyInstance} from 'fastify'
import type {UserRoutesOptions} from './index'
import type {UserCredentials} from '../schemas/entities'


interface SigninUser {
  Body: UserCredentials
}


export async function signin(fastify: FastifyInstance, {userService, userSchemas}: UserRoutesOptions) {
  return fastify
    .route<SigninUser>(
      {
        url: '/user/signin',
        method: 'POST',
        schema: {
          summary: 'User sing in',
          tags: ['User - Me'],
          body: userSchemas.entities.UserCredentials,
          headers: {
            'x-localhost': {
              description: 'Any value for set cookie for the localhost domain',
              type: 'string'
            }
          },
          response: {
            [200]: {
              description: 'User',
              type: 'object',
              properties: {
                user: userSchemas.entities.UserBase
              },
              additionalProperties: false,
              required: ['user']
            }
          }
        },
        security: {
          auth: false
        },
        handler: async function(request, reply) {
          const {user, sessionId} = await userService.signin(request.body)

          let cookieOptions = config.user.session.cookie

          if (request.headers['x-localhost']) {
            cookieOptions = {
              ...cookieOptions,
              domain: 'localhost'
            }
          }

          reply
            .setCookie('sessionId', sessionId, cookieOptions)
            .code(200)
            .type('application/json')
            .send({user})
        }
      }
    )
}