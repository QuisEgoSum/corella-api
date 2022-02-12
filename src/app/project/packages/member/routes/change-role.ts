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


export interface ChangeRoleRequest {
  Params: {
    projectId: string,
    memberId: string
  },
  Body: {
    roleId: string
  }
}


export async function changeRole(fastify: FastifyInstance, {memberService, memberSchemas}: MemberRouteOptions) {
  return fastify
    .route<ChangeRoleRequest>(
      {
        url: '/project/:projectId/member/:memberId',
        method: 'PATCH',
        schema: {
          summary: 'Change member role',
          tags: ['Project Member'],
          params: {
            projectId: memberSchemas.properties.projectId,
            memberId: memberSchemas.properties._id
          },
          body: {
            type: 'object',
            properties: {
              roleId: memberSchemas.properties.roleId
            },
            additionalProperties: false,
            required: ['roleId'],
            errorMessage: {
              required: {
                roleId: 'Select the member role'
              }
            }
          },
          response: {
          }
        },
        security: {
          auth: true
        },
        handler: async function(request, reply) {
          const member = await memberService.changeMemberRole(request.params.projectId, request.params.memberId, request.body.roleId)

          reply
            .code(200)
            .type('application/json')
            .send({member})
        }
      }
    )
}