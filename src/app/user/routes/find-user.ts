import type {FastifyInstance} from 'fastify'
import type {UserService} from 'app/user/UserService'
import {BadRequestNoBody, NotFound} from 'common/schemas/response'
import {UserNotExistsError} from '../user-error'


interface FindUserRequest {
  Params: {
    userId: string
  }
}


export async function findUser(fastify: FastifyInstance, service: UserService, schemas: typeof import('app/user/schemas')) {
  return fastify
    .route<FindUserRequest>(
      {
        url: '/user/:userId',
        method: 'GET',
        schema: {
          summary: 'Get user by id',
          tags: ['User - Admin'],
          params: {
            userId: schemas.properties._id
          },
          response: {
            [200]: {
              description: 'User',
              type: 'object',
              properties: {
                user: schemas.entities.UserBase
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
          const user = await service.findById(request.params.userId)

          reply
            .code(200)
            .type('application/json')
            .send({user})
        }
      }
    )
}