import type {FastifyInstance} from 'fastify'
import {BadRequest} from 'common/schemas/response'
import {UserExistsError} from '../user-error'
import {UserRoutesOptions} from './index'
import type {CreateUser} from '../schemas/entities'


interface CreateUserRequest {
  Body: CreateUser
}

export async function createUser(fastify: FastifyInstance, {userService, userSchemas}: UserRoutesOptions) {
  return fastify
    .route<CreateUserRequest>(
      {
        url: '/admin/user',
        method: 'POST',
        schema: {
          summary: 'Create user',
          tags: ['User - Admin'],
          body: userSchemas.entities.CreateUser,
          response: {
            [201]: {
              description: 'User',
              type: 'object',
              properties: {
                user: userSchemas.entities.UserBase
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
          const user = await userService.create(request.body)

          reply
            .code(201)
            .type('application/json')
            .send({user})
        }
      }
    )
}