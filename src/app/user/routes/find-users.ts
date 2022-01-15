import {BadRequestNoBody, DataList} from 'common/schemas/response'
import type {FastifyInstance} from 'fastify'
import type {FindUsersQuery} from '../schemas/entities'
import type {UserRoutesOptions} from './index'


interface FindUsersRequest {
  Querystring: FindUsersQuery
}


export async function findUsers(fastify: FastifyInstance, {userService, userSchemas}: UserRoutesOptions) {
  return fastify
    .route<FindUsersRequest>(
      {
        url: '/users',
        method: 'GET',
        schema: {
          summary: 'Get users list',
          tags: ['User - Admin'],
          querystring: userSchemas.entities.FindUsersQuery,
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