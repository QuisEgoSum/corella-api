import type {FastifyInstance} from 'fastify'
import type {UserService} from 'app/user/UserService'
import type {UpdateUser} from '../schemas/entities'
import {BadRequest} from 'common/schemas/response'


interface UpdateUserRequest {
  Body: UpdateUser
}


export async function updateUser(fastify: FastifyInstance, service: UserService, schemas: typeof import('app/user/schemas')) {
  return fastify
    .route<UpdateUserRequest>(
      {
        url: '/user',
        method: 'PATCH',
        schema: {
          summary: 'Update user',
          tags: ['User - Me'],
          body: schemas.entities.UpdateUser,
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
            [400]: new BadRequest().bodyErrors().updateError()
          }
        },
        security: {
          auth: true
        },
        handler: async function(request, reply) {
          const user = await service.findByIdAndUpdate(request.session.userId, request.body)

          reply
            .code(200)
            .type('application/json')
            .send({user})
        }
      }
    )
}