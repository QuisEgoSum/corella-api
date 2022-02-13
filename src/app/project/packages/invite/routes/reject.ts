import {schemas as inviteSchemas, error as inviteError} from '..'
import {BadRequest, Forbidden, MessageResponse, NotFound} from '@common/schemas/response'
import type {FastifyInstance} from 'fastify'
import type {InviteRouteOptions} from '@app/project/packages/invite/routes/index'


export interface RejectRequest {
  Params: {
    inviteId: string
  }
}


export async function reject(fastify: FastifyInstance, inviteService: InviteRouteOptions) {
  return fastify
    .route<RejectRequest>(
      {
        url: '/project/invite/:inviteId',
        method: 'DELETE',
        schema: {
          summary: 'Reject invite to the project',
          description: 'The user reject the invitation to the project',
          tags: ['Project Invite'],
          params: {
            inviteId: inviteSchemas.properties._id
          },
          response: {
            [200]: new MessageResponse('Invitation successfully rejected'),
            [400]: new BadRequest(
              inviteError.InviteCancelledError.schema(),
              inviteError.InviteRejectedError.schema(),
              inviteError.InviteAcceptedError.schema()
            ).bodyErrors(),
            [403]: new Forbidden(
              inviteError.SomeoneElseInvitationError.schema(),
            ),
            [404]: new NotFound(
              inviteError.InviteNotExistsError.schema()
            )
          }
        },
        security: {
          auth: true
        },
        handler: async function(request, reply) {
          await inviteService.rejectInvite(request.params.inviteId, request.session.userId)

          reply
            .code(200)
            .type('application/json')
            .send({message: 'Invitation successfully rejected'})
        }
      }
    )
}