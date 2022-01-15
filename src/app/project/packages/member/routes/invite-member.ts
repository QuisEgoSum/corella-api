import {MemberRouteOptions} from './index'
import {FastifyInstance} from 'fastify'
import {InviteMember} from '../schemas/entities'
import {BadRequest} from 'common/schemas/response'
import {MemberExistsError} from '../member-error'


export interface InviteMemberRequest {
  Params: {
    projectId: string
  },
  Body: InviteMember
}


export async function inviteMember(fastify: FastifyInstance, {memberService, memberSchemas, roleError, userError}: MemberRouteOptions) {
  return fastify
    .route<InviteMemberRequest>(
      {
        url: '/project/:projectId/member/invite',
        method: 'POST',
        schema: {
          summary: 'Invite member to project',
          tags: ['Project Member'],
          params: {
            projectId: memberSchemas.properties.projectId
          },
          body: memberSchemas.entities.InviteMember,
          response: {
            [201]: {
              description: 'Invited member',
              type: 'object',
              properties: {
                member: memberSchemas.entities.BaseMember
              },
              additionalProperties: false,
              required: ['member']
            },
            [400]: new BadRequest(
              MemberExistsError.schema(),
              userError.UserNotExistsError.schema(),
              roleError.RoleNotExistsError.schema()
            ).bodyErrors()
          }
        },
        handler: async function(request, reply) {
          const member = await memberService.inviteMember(
            request.params.projectId,
            request.body.userId,
            request.body.roleId
          )

          reply
            .code(201)
            .type('application/json')
            .send({member})
        }
      }
    )
}