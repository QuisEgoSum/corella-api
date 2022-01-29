import {FastifyInstance} from 'fastify'
import {MemberRouteOptions} from './index'
import {QueryPageLimit, QueryPageNumber} from 'common/schemas/query'
import {DataList} from 'common/schemas/response'


interface GetMembersRequest {
  Params: {
    projectId: string
  },
  Querystring: {
    page: number,
    limit: number
  }
}


export async function getMembers(fastify: FastifyInstance, {memberService, memberSchemas}: MemberRouteOptions) {
  return fastify
    .route<GetMembersRequest>(
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