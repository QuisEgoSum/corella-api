import {schemas as inviteSchemas, error as inviteError} from '..'
import {BadRequest, MessageResponse} from '@common/schemas/response'
import {schemas as memberSchemas} from '@app/project/packages/member'
import type {FastifyInstance} from 'fastify'
import type {InviteRouteOptions} from '@app/project/packages/invite/routes/index'


export interface CancelRequest {
  Params: {
    projectId: string,
    inviteId: string
  }
}


export async function cancel(fastify: FastifyInstance, inviteService: InviteRouteOptions) {
  return fastify
    .route<CancelRequest>(
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
              inviteError.SomeoneElseProjectInvitationError.schema(),
              inviteError.InviteCancelledError.schema(),
              inviteError.InviteRejectedError.schema(),
              inviteError.InviteAcceptedError.schema()
            ).paramsErrors()
          }
        },
        security: {
          auth: false
        },
        handler: async function(request, reply) {
          await inviteService.cancelInvite(request.params.projectId, request.params.inviteId)

          reply
            .code(200)
            .type('application/json')
            .send({message: 'Invitation successfully cancelled'})
        }
      }
    )
}