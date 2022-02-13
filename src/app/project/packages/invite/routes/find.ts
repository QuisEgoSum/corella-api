import {QueryPageLimit, QueryPageNumber} from '@common/schemas/query'
import {DataList} from '@common/schemas/response'
import {schemas as inviteSchemas} from '..'
import type {FastifyInstance} from 'fastify'
import type {InviteRouteOptions} from '@app/project/packages/invite/routes/index'


export interface FindRequest {
  Querystring: {
    page: number,
    limit: number
  }
}


export async function find(fastify: FastifyInstance, inviteService: InviteRouteOptions) {
  return fastify
    .route<FindRequest>(
      {
        method: 'GET',
        url: '/invite/projects',
        schema: {
          summary: 'Get invited projects',
          description: 'The user receives a list of projects to which he was invited',
          tags: ['Project'],
          query: {
            page: new QueryPageNumber().setDefault(1),
            limit: new QueryPageLimit().setDefault(10)
          },
          response: {
            [200]: new DataList(inviteSchemas.entities.InviteExpandProject)
          }
        },
        security: {
          auth: true
        },
        handler: async function(request, reply) {
          const list = await inviteService.findProjectsByUserInvites(request.session.userId, request.query)

          reply
            .code(200)
            .type('application/json')
            .send(list)
        }
      }
    )
}