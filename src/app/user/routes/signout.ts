import {config} from '@config'
import type {FastifyInstance} from 'fastify'
import type{UserRoutesOptions} from './index'


interface SignoutUser {
  Headers: {
    'x-localhost': string
  }
}

export async function signout(fastify: FastifyInstance, {userService}: UserRoutesOptions) {
  return fastify
    .route<SignoutUser>(
      {
        url: '/user/signout',
        method: 'DELETE',
        schema: {
          summary: 'User sign out',
          tags: ['User - Me'],
          headers: {
            'x-localhost': {
              description: 'Any value for set cookie for the localhost domain',
              type: 'string'
            }
          },
          response: {
            [200]: {
              description: 'Success message',
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  default: 'You have logged out of your account'
                }
              },
              additionalProperties: false,
              required: ['message']
            }
          }
        },
        security: {
          auth: true
        },
        handler: async function(request, reply) {
          await userService.logout(request.session.userId, request.session.sessionId)

          let cookieOptions = config.user.session.cookie

          if (request.headers['x-localhost']) {
            cookieOptions = {
              ...cookieOptions,
              domain: 'localhost'
            }
          }

          reply
            .clearCookie('sessionId', cookieOptions)
            .code(200)
            .type('application/json')
            .send({message: 'You have logged out of your account'})
        }
      }
    )
}