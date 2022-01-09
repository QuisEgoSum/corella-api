import type {FastifyInstance} from 'fastify'
import type {UserService} from 'app/user/UserService'
import type {entities} from 'app/user/schemas'
import {BadRequest} from 'common/schemas/response'
import {UserExistsError} from '../user-error'


interface CreateUserRequest {
  Body: entities.CreateUser
}

export async function createUser(fastify: FastifyInstance, service: UserService, schemas: typeof import('app/user/schemas')) {
  return fastify
    .route<CreateUserRequest>(
      {
        url: '/user',
        method: 'POST',
        schema: {
          // @ts-ignore
          summary: 'Create user',
          tags: ['User - Admin'],
          body: schemas.entities.CreateUser,
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
            [400]: new BadRequest(UserExistsError.schema()).bodyErrors()
          }
        },
        security: {
          auth: true,
          admin: true
        },
        handler: async function(request, reply) {
          const user = await service.create(request.body)

          reply
            .code(200)
            .type('application/json')
            .send({user})
        }
      }
    )
}