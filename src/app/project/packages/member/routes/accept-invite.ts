import {FastifyInstance} from 'fastify'
import {MemberRouteOptions} from './index'
import {BadRequest, MessageResponse} from 'common/schemas/response'
import {
  InviteAcceptedError,
  InviteCancelledError,
  InviteDeclinedError,
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
          tags: ['Project Member'],
          params: {
            inviteId: inviteSchemas.properties._id
          },
          response: {
            [200]: new MessageResponse('The invitation was successfully accepted'),
            [400]: new BadRequest(
              SomeoneElseInvitationError.schema(),
              InviteAcceptedError.schema(),
              InviteDeclinedError.schema(),
              InviteCancelledError.schema()
            )
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