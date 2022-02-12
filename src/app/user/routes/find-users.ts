import {BadRequestNoBody, DataList} from '@common/schemas/response'
import type {FastifyInstance} from 'fastify'
import type {FindUsersQuery} from '../schemas/entities'
import type {UserRoutesOptions} from './index'


interface FindUsersRequest {
  Querystring: FindUsersQuery
}


export async function findUsersAdmin(fastify: FastifyInstance, {userService, userSchemas}: UserRoutesOptions) {
  return fastify
    .route<FindUsersRequest>(
      {
        url: '/users',
        method: 'GET',
        schema: {
          summary: 'Get users list',
          tags: ['User'],
          querystring: userSchemas.entities.FindUsersQuery,
          response: {
            [200]: new DataList(userSchemas.entities.UserPreview),
            [400]: new BadRequestNoBody()
          }
        },
        security: {
          auth: true
        },
        handler: async function(request, reply) {
          const dataList = await userService.findPreviewPage(request.query)

          reply
            .code(200)
            .type('application/json')
            .send(dataList)
        }
      }
    )
}