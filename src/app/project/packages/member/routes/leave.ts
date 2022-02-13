import {MemberRouteOptions} from './index'
import {FastifyInstance} from 'fastify'
import {BadRequest, MessageResponse, NotFound} from '@common/schemas/response'
import {MemberNotExistsError} from '@app/project/packages/member/member-error'


export interface LeaveRequest {
  Params: {
    projectId: string
  }
}


export async function leave(fastify: FastifyInstance, {memberService, memberSchemas}: MemberRouteOptions) {
  return fastify
    .route<LeaveRequest>(
      {
        url: '/project/:projectId/member',
        method: 'DELETE',
        schema: {
          summary: 'Leave the project',
          tags: ['Project Member'],
          params: {
            projectId: memberSchemas.properties.projectId
          },
          response: {
            [200]: new MessageResponse('You have left the project'),
            [400]: new BadRequest().paramsErrors()
          }
        },
        security: {
          auth: true
        },
        handler: async function(request, reply) {
          await memberService.leave(request.params.projectId, request.session.userId)

          reply
            .code(200)
            .type('application/json')
            .send({message: 'You have left the project'})
        }
      }
    )
}