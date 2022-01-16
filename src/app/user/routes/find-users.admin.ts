import {BadRequestNoBody, DataList} from 'common/schemas/response'
import type {FastifyInstance} from 'fastify'
import type {FindUsersQueryAdmin} from '../schemas/entities'
import type {UserRoutesOptions} from './index'


interface FindUsersRequest {
  Querystring: FindUsersQueryAdmin
}


export async function findUsersAdmin(fastify: FastifyInstance, {userService, userSchemas}: UserRoutesOptions) {
  return fastify
    .route<FindUsersRequest>(
      {
        url: '/admin/users',
        method: 'GET',
        schema: {
          summary: 'Get users list for admin',
          tags: ['User - Admin'],
          querystring: userSchemas.entities.FindUsersQueryAdmin,
          response: {
            [200]: new DataList(userSchemas.entities.UserBase),
            [400]: new BadRequestNoBody()
          }
        },
        security: {
          auth: true,
          admin: true
        },
        handler: async function(request, reply) {
          const dataList = await userService.findPage(request.query)

          reply
            .code(200)
            .type('application/json')
            .send(dataList)
        }
      }
    )
}