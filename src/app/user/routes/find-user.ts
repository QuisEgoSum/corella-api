import {BadRequestNoBody, NotFound} from 'common/schemas/response'
import {UserNotExistsError} from '../user-error'
import type {FastifyInstance} from 'fastify'
import type {UserRoutesOptions} from './index'


interface FindUserRequest {
  Params: {
    userId: string
  }
}


export async function findUser(fastify: FastifyInstance, {userService, userSchemas}: UserRoutesOptions) {
  return fastify
    .route<FindUserRequest>(
      {
        url: '/user/:userId',
        method: 'GET',
        schema: {
          summary: 'Get user by id',
          tags: ['User - Admin'],
          params: {
            userId: userSchemas.properties._id
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
            },
            [400]: new BadRequestNoBody(),
            [404]: new NotFound(UserNotExistsError.schema())
          }
        },
        security: {
          auth: true,
          admin: true
        },
        handler: async function(request, reply) {
          const user = await userService.findById(request.params.userId)

          reply
            .code(200)
            .type('application/json')
            .send({user})
        }
      }
    )
}