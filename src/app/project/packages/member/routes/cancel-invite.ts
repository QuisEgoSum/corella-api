import {FastifyInstance} from 'fastify'
import {MemberRouteOptions} from './index'
import {BadRequest, MessageResponse} from '@common/schemas/response'
import {
  InviteAcceptedError,
  InviteCancelledError,
  InviteRejectedError,
  SomeoneElseProjectInvitationError
} from '../packages/invite/invite-error'


export interface CancelInviteRequest {
  Params: {
    projectId: string,
    inviteId: string
  }
}


export async function cancelInvite(fastify: FastifyInstance, {memberService, memberSchemas, inviteSchemas}: MemberRouteOptions) {
  return fastify
    .route<CancelInviteRequest>(
      {
        method: 'DELETE',
        url: '/project/:projectId/member/invite/:inviteId',
        schema: {
          summary: 'Cancel invite',
          description: 'The project participant will cancel the user\'s invitation',
          tags: ['Project Invite'],
          params: {
            projectId: memberSchemas.properties.projectId,
            inviteId: inviteSchemas.properties._id
          },
          response: {
            [200]: new MessageResponse('Invitation successfully cancelled'),
            [400]: new BadRequest(
              SomeoneElseProjectInvitationError.schema(),
              InviteCancelledError.schema(),
              InviteRejectedError.schema(),
              InviteAcceptedError.schema()
            ).paramsErrors()
          }
        },
        handler: async function(request, reply) {
          await memberService.cancelInvite(request.params.projectId, request.params.inviteId)

          reply
            .code(200)
            .type('application/json')
            .send({message: 'Invitation successfully cancelled'})
        }
      }
    )
}