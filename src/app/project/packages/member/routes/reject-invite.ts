import {MemberRouteOptions} from './index'
import {FastifyInstance} from 'fastify'
import {InviteMember} from '../schemas/entities'
import {BadRequest, Forbidden, MessageResponse, NotFound} from 'common/schemas/response'
import {MemberExistsError} from '../member-error'
import {
  InviteAcceptedError,
  InviteCancelledError,
  InviteNotExistsError,
  InviteRejectedError, SomeoneElseInvitationError
} from '../packages/invite/invite-error'


export interface RejectInviteRequest {
  Params: {
    inviteId: string
  }
}


export async function rejectInvite(fastify: FastifyInstance, {memberService, inviteSchemas}: MemberRouteOptions) {
  return fastify
    .route<RejectInviteRequest>(
      {
        url: '/project/invite/:inviteId',
        method: 'DELETE',
        schema: {
          summary: 'Reject invite to the project',
          tags: ['Project Member'],
          params: {
            inviteId: inviteSchemas.properties._id
          },
          response: {
            [200]: new MessageResponse('Invitation successfully rejected'),
            [400]: new BadRequest(
              InviteCancelledError.schema(),
              InviteRejectedError.schema(),
              InviteAcceptedError.schema()
            ).bodyErrors(),
            [403]: new Forbidden(
              SomeoneElseInvitationError.schema(),
            ),
            [404]: new NotFound(
              InviteNotExistsError.schema()
            )
          }
        },
        security: {
          auth: true
        },
        handler: async function(request, reply) {
          await memberService.rejectInvite(request.params.inviteId, request.session.userId)

          reply
            .code(200)
            .type('application/json')
            .send({message: 'Invitation successfully rejected'})
        }
      }
    )
}