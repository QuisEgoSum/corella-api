import type {FastifyInstance} from 'fastify'
import type {UserRoutesOptions} from './index'


export async function signoutAll(fastify: FastifyInstance, {userService}: UserRoutesOptions) {
  return fastify
    .route(
      {
        url: '/user/signout/all',
        method: 'DELETE',
        schema: {
          summary: 'User sign out of all sessions except current one',
          tags: ['User - Me'],
          response: {
            [200]: {
              description: 'Success message',
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  default: 'You have logged out of {N} sessions'
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
          const numberOfSessions = await userService.logoutAllExpect(request.session.userId, request.session.sessionId)

          reply
            .code(200)
            .type('application/json')
            .send({message: `You have logged out of ${numberOfSessions} sessions`})
        }
      }
    )
}