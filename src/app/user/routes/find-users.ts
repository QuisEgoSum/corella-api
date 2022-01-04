import type {FastifyInstance} from 'fastify'
import type {UserService} from 'app/user/UserService'
import {BadRequestNoBody, DataList} from 'common/schemas/response'
import type {FindUsersQuery} from '../schemas/entities'


interface FindUsersRequest {
  Querystring: FindUsersQuery
}


export async function findUsers(fastify: FastifyInstance, service: UserService, schemas: typeof import('app/user/schemas')) {
  return fastify
    .route<FindUsersRequest>(
      {
        url: '/users',
        method: 'GET',
        schema: {
          summary: 'Get users list',
          tags: ['User - Admin'],
          querystring: schemas.entities.FindUsersQuery,
          response: {
            [200]: new DataList(schemas.entities.UserBase),
            [400]: new BadRequestNoBody()
          }
        },
        security: {
          auth: true,
          admin: true
        },
        handler: async function(request, reply) {
          const dataList = await service.findPage(request.query)
          console.log(request.query)
          console.log(dataList)

          reply
            .code(200)
            .type('application/json')
            .send(dataList)
        }
      }
    )
}