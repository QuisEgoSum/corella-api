import {FastifyInstance} from 'fastify'
import {MemberRouteOptions} from './index'
import {MessageResponse} from 'common/schemas/response'


export interface BlockMemberRequest {
  Params: {
    memberId: string,
    projectId: string
  }
}


export async function blockMember(fastify: FastifyInstance, {memberService, memberSchemas}: MemberRouteOptions) {
  return fastify
    .route<BlockMemberRequest>(
      {
        method: 'DELETE',
        url: '/project/:projectId/member/:memberId',
        schema: {
          summary: 'Block member',
          tags: ['Project Member'],
          params: {
            memberId: memberSchemas.properties._id,
            projectId: memberSchemas.properties.projectId
          },
          response: {
            [200]: new MessageResponse('The participant was blocked'),
          }
        },
        security: {
          auth: true
        },
        handler: async function(request, reply) {
          await memberService.blockMember(request.params.projectId, request.params.memberId)

          reply
            .code(200)
            .type('application/json')
            .send({message: 'The participant was blocked'})
        }
      }
    )
}