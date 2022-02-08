import {FastifyInstance} from 'fastify'
import {MemberRouteOptions} from './index'
import {BadRequest, Forbidden, MessageResponse} from 'common/schemas/response'
import {
  InviteAcceptedError,
  InviteCancelledError,
  InviteRejectedError,
  SomeoneElseInvitationError
} from '../packages/invite/invite-error'


export interface AcceptInviteRequest {
  Params: {
    inviteId: string
  }
}


export async function acceptInvite(fastify: FastifyInstance, {memberService, inviteSchemas}: MemberRouteOptions) {
  return fastify
    .route<AcceptInviteRequest>(
      {
        method: 'PUT',
        url: '/project/invite/:inviteId',
        schema: {
          summary: 'Accept invite',
          description: 'The user accepts the invitation to the project',
          tags: ['Project Invite'],
          params: {
            inviteId: inviteSchemas.properties._id
          },
          response: {
            [200]: new MessageResponse('The invitation was successfully accepted'),
            [400]: new BadRequest(
              InviteAcceptedError.schema(),
              InviteRejectedError.schema(),
              InviteCancelledError.schema()
            ),
            [403]: new Forbidden(SomeoneElseInvitationError.schema())
          }
        },
        security: {
          auth: true
        },
        handler: async function(request, reply) {
          await memberService.acceptInvite(request.params.inviteId, request.session.userId)

          reply
            .code(200)
            .type('application/json')
            .send({message: 'The invitation was successfully accepted'})
        }
      }
    )
}