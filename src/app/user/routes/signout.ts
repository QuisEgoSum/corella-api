import {config} from '@config'
import type {FastifyInstance} from 'fastify'
import type{UserRoutesOptions} from './index'


export async function signout(fastify: FastifyInstance, {userService}: UserRoutesOptions) {
  return fastify
    .route(
      {
        url: '/user/signout',
        method: 'DELETE',
        schema: {
          summary: 'User sign out',
          tags: ['User - Me'],
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

          reply
            .clearCookie('sessionId', config.user.session.cookie)
            .code(200)
            .type('application/json')
            .send({message: 'You have logged out of your account'})
        }
      }
    )
}