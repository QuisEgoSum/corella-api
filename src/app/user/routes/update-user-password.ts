import {BadRequest} from 'common/schemas/response'
import type {FastifyInstance} from 'fastify'
import type {UpdateUserPassword} from '../schemas/entities'
import type {UserRoutesOptions} from './index'


interface UpdateUserRequest {
  Body: UpdateUserPassword
}


export async function updateUser(fastify: FastifyInstance, {userService, userSchemas}: UserRoutesOptions) {
  return fastify
    .route<UpdateUserRequest>(
      {
        url: '/user/password',
        method: 'PATCH',
        schema: {
          summary: 'Update user password',
          tags: ['User - Me'],
          body: userSchemas.entities.UpdateUserPassword,
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
          const user = await userService.updateUserPassword(request.session.userId, request.body)

          reply
            .code(200)
            .type('application/json')
            .send({user})
        }
      }
    )
}