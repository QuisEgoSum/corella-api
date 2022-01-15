import type {FastifyInstance} from 'fastify'
import type {UserRoutesOptions} from './index'


export async function getUser(fastify: FastifyInstance, {userService, userSchemas}: UserRoutesOptions) {
  return fastify
    .route(
      {
        url: '/user',
        method: 'GET',
        schema: {
          summary: 'Get user',
          tags: ['User - Me'],
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
          auth: true
        },
        handler: async function(request, reply) {
          const user = await userService.findById(request.session.userId)

          reply
            .code(200)
            .type('application/json')
            .send({user})
        }
      }
    )
}