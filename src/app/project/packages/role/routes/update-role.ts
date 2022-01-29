import type {UpdateRole} from '../schemas/entities'
import type {FastifyInstance} from 'fastify'
import {RoleRouteOptions} from './index'
import {BadRequest, ErrorResponse, Forbidden, NotFound} from 'common/schemas/response'
import {RoleNotExistsError, UnableUpdateRoleError} from '../role-error'


export interface UpdateRoleRequest {
  Params: {
    projectId: string,
    roleId: string
  },
  Body: UpdateRole
}


export async function updateRole(fastify: FastifyInstance, {roleSchemas, roleService}: RoleRouteOptions) {
  return fastify
    .route<UpdateRoleRequest>(
      {
        method: 'PATCH',
        url: '/project/:projectId/role/:roleId',
        schema: {
          summary: 'Update role by id',
          tags: ['Project Role'],
          body: roleSchemas.entities.UpdateRole,
          params: {
            projectId: roleSchemas.properties.projectId,
            roleId: roleSchemas.properties._id
          },
          response: {
            [200]: {
              description: 'Updated role',
              type: 'object',
              properties: {
                role: roleSchemas.entities.BaseRole
              },
              additionalProperties: false,
              required: ['role']
            },
            [400]: new BadRequest().bodyErrors().updateError(),
            [403]: new Forbidden(UnableUpdateRoleError.schema()),
            [404]: new NotFound(RoleNotExistsError.schema())
          }
        },
        security: {
          auth: true
        },
        handler: async function(request, reply) {
          const role = await roleService.updateRole(request.params.projectId, request.params.roleId, request.body)

          reply
            .code(200)
            .type('application/json')
            .send({role})
        }
      }
    )
}