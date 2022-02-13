import {schemas as memberSchemas} from '..'
import {MessageResponse} from '@common/schemas/response'
import type {FastifyInstance} from 'fastify'
import type {MemberRouteOptions} from '.'
import {RolePermission} from '@app/project/packages/role'


export interface BlockRequest {
  Params: {
    memberId: string,
    projectId: string
  }
}


export async function block(fastify: FastifyInstance, memberService: MemberRouteOptions) {
  return fastify
    .route<BlockRequest>(
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
            [200]: new MessageResponse('The participant was blocked')
          }
        },
        security: {
          auth: true,
          project: RolePermission.MANAGING_PARTICIPANTS
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