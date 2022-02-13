import {schemas as memberSchemas} from '..'
import {DataList} from '@common/schemas/response'
import {QueryPageLimit, QueryPageNumber} from '@common/schemas/query'
import type {FastifyInstance} from 'fastify'
import type {MemberRouteOptions} from '.'


interface FindRequest {
  Params: {
    projectId: string
  },
  Querystring: {
    page: number,
    limit: number
  }
}


export async function find(fastify: FastifyInstance, memberService: MemberRouteOptions) {
  return fastify
    .route<FindRequest>(
      {
        url: '/project/:projectId/members',
        method: 'GET',
        schema: {
          summary: 'Get project members',
          tags: ['Project Member'],
          params: {
            projectId: memberSchemas.properties.projectId
          },
          query: {
            page: new QueryPageNumber().setDefault(1),
            limit: new QueryPageLimit().setDefault(20)
          },
          response: {
            [200]: new DataList(memberSchemas.entities.BaseMember)
          }
        },
        security: {
          auth: true
        },
        handler: async function(request, reply) {
          const list = await memberService.findProjectMembers(request.params.projectId, request.query)

          reply
            .code(200)
            .type('application/json')
            .send(list)
        }
      }
    )
}