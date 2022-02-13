import {schemas as inviteSchemas} from '..'
import {error as userError} from '@app/user'
import {error as memberError, schemas as memberSchemas} from '@app/project/packages/member'
import {error as roleError} from '@app/project/packages/role'
import {BadRequest, NotFound} from '@common/schemas/response'
import type {FastifyInstance} from 'fastify'
import type {InviteRouteOptions} from '@app/project/packages/invite/routes/index'


export interface CreateRequest {
  Params: {
    projectId: string
  },
  Body: inviteSchemas.entities.InviteMember
}


export async function create(fastify: FastifyInstance, inviteService: InviteRouteOptions) {
  return fastify
    .route<CreateRequest>(
      {
        url: '/project/:projectId/member/invite',
        method: 'POST',
        schema: {
          summary: 'Create invite',
          description: 'The project participant creates an invitation to the user',
          tags: ['Project Invite'],
          params: {
            projectId: inviteSchemas.properties.projectId
          },
          body: inviteSchemas.entities.InviteMember,
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
              memberError.MemberExistsError.schema()
            ).bodyErrors(),
            [404]: new NotFound(
              userError.UserNotExistsError.schema(),
              roleError.RoleNotExistsError.schema()
            )
          }
        },
        security: {
          auth: true
        },
        handler: async function(request, reply) {
          const member = await inviteService.createInvite(
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