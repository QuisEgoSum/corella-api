import {FastifyInstance} from 'fastify'
import {MemberRouteOptions} from './index'
import {QueryPageLimit, QueryPageNumber} from 'common/schemas/query'
import {DataList} from 'common/schemas/response'


export interface FindInvitedProjectsRequest {
  Querystring: {
    page: number,
    limit: number
  }
}


export async function findInvitedProjects(fastify: FastifyInstance, {memberService, inviteSchemas}: MemberRouteOptions) {
  return fastify
    .route<FindInvitedProjectsRequest>(
      {
        method: 'GET',
        url: '/invite/projects',
        schema: {
          summary: 'Get invited projects',
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
          const list = await memberService.findProjectsByUserInvites(request.session.userId, request.query)

          reply
            .code(200)
            .type('application/json')
            .send(list)
        }
      }
    )
}