import type {FastifyInstance} from 'fastify'
import type {UserService} from 'app/user/UserService'
import {config} from '@config'


export async function logout(fastify: FastifyInstance, service: UserService) {
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
          await service.logout(request.session.userId, request.session.sessionId)

          reply
            .clearCookie('sessionId', config.user.session.cookie)
            .code(200)
            .type('application/json')
            .send({message: 'You have logged out of your account'})
        }
      }
    )
}