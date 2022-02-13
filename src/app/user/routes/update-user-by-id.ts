import {UserNotExistsError} from '../user-error'
import {BadRequest, NotFound} from '@common/schemas/response'
import type {FastifyInstance} from 'fastify'
import type {UpdateUserById} from '../schemas/entities'
import type {UserRoutesOptions} from '.'


interface UpdateUserByIdRequest {
  Params: {
    userId: string
  },
  Body: UpdateUserById
}


export async function updateUserById(fastify: FastifyInstance, {userService, userSchemas}: UserRoutesOptions) {
  return fastify
    .route<UpdateUserByIdRequest>(
      {
        url: '/admin/user/:userId',
        method: 'PATCH',
        schema: {
          summary: 'Update user by id',
          tags: ['User - Admin'],
          params: {
            userId: userSchemas.properties._id
          },
          body: userSchemas.entities.UpdateUserById,
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
            [400]: new BadRequest(UserNotExistsError.schema()).bodyErrors().updateError(),
            [404]: new NotFound(UserNotExistsError.schema())
          }
        },
        security: {
          auth: true,
          admin: true
        },
        handler: async function(request, reply) {
          const user = await userService.findByIdAndUpdate(request.params.userId, request.body)

          reply
            .code(200)
            .type('application/json')
            .send({user})
        }
      }
    )
}