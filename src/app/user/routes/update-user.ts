import {BadRequest} from '@common/schemas/response'
import type {FastifyInstance} from 'fastify'
import type {UpdateUser} from '../schemas/entities'
import type {UserRoutesOptions} from './index'


interface UpdateUserRequest {
  Body: UpdateUser
}


export async function updateUser(fastify: FastifyInstance, {userService, userSchemas}: UserRoutesOptions) {
  return fastify
    .route<UpdateUserRequest>(
      {
        url: '/user',
        method: 'PATCH',
        schema: {
          summary: 'Update user',
          tags: ['User - Me'],
          body: userSchemas.entities.UpdateUser,
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
            [400]: new BadRequest().bodyErrors().updateError()
          }
        },
        security: {
          auth: true
        },
        handler: async function(request, reply) {
          const user = await userService.findByIdAndUpdate(request.session.userId, request.body)

          reply
            .code(200)
            .type('application/json')
            .send({user})
        }
      }
    )
}