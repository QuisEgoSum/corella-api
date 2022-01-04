import type {FastifyInstance} from 'fastify'
import type {UserService} from 'app/user/UserService'
import type {UpdateUserById} from '../schemas/entities'
import {BadRequest, NotFound} from 'common/schemas/response'
import {UserNotExistsError} from '../user-error'


interface UpdateUserByIdRequest {
  Params: {
    userId: string
  },
  Body: UpdateUserById
}


export async function updateUserById(fastify: FastifyInstance, service: UserService, schemas: typeof import('app/user/schemas')) {
  return fastify
    .route<UpdateUserByIdRequest>(
      {
        url: '/user/:userId',
        method: 'PATCH',
        schema: {
          summary: 'Update user by id',
          tags: ['User - Admin'],
          params: {
            userId: schemas.properties._id
          },
          body: schemas.entities.UpdateUserById,
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
            [400]: new BadRequest(UserNotExistsError.schema()).bodyErrors().updateError(),
            [404]: new NotFound(UserNotExistsError.schema())
          }
        },
        security: {
          auth: true,
          admin: true
        },
        handler: async function(request, reply) {
          const user = await service.findByIdAndUpdate(request.params.userId, request.body)

          reply
            .code(200)
            .type('application/json')
            .send({user})
        }
      }
    )
}