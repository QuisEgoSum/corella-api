import {schemas as inviteSchemas, error as inviteError} from '..'
import {BadRequest, Forbidden, MessageResponse} from '@common/schemas/response'
import type {FastifyInstance} from 'fastify'
import type {InviteRouteOptions} from '@app/project/packages/invite/routes/index'


export interface AcceptRequest {
  Params: {
    inviteId: string
  }
}


export async function accept(fastify: FastifyInstance, inviteService: InviteRouteOptions) {
  return fastify
    .route<AcceptRequest>(
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
              inviteError.InviteAcceptedError.schema(),
              inviteError.InviteRejectedError.schema(),
              inviteError.InviteCancelledError.schema()
            ),
            [403]: new Forbidden(inviteError.SomeoneElseInvitationError.schema())
          }
        },
        security: {
          auth: true
        },
        handler: async function(request, reply) {
          await inviteService.acceptInvite(request.params.inviteId, request.session.userId)

          reply
            .code(200)
            .type('application/json')
            .send({message: 'The invitation was successfully accepted'})
        }
      }
    )
}