import {FastifyInstance} from 'fastify'
import {RoleRouteOptions} from '.'
import {Forbidden, MessageResponse, NotFound} from '@common/schemas/response'
import {RoleNotExistsError, UnableDeleteRoleError} from '../role-error'
import {RolePermission} from '@app/project/packages/role'


export interface DeleteRoleRequest {
  Params: {
    projectId: string,
    roleId: string
  }
}


export async function deleteRole(fastify: FastifyInstance, {roleService, roleSchemas}: RoleRouteOptions) {
  return fastify
    .route<DeleteRoleRequest>(
      {
        method: 'DELETE',
        url: '/project/:projectId/role/:roleId',
        schema: {
          summary: 'Delete role by id',
          tags: ['Project Role'],
          params: {
            projectId: roleSchemas.properties.projectId,
            roleId: roleSchemas.properties._id
          },
          response: {
            [200]: new MessageResponse('Role deleted'),
            [403]: new Forbidden(UnableDeleteRoleError.schema()),
            [404]: new NotFound(RoleNotExistsError.schema())
          }
        },
        security: {
          auth: true,
          project: RolePermission.MANAGING_PARTICIPANTS
        },
        handler: async function(request, reply) {
          await roleService.deleteRole(request.params.projectId, request.params.roleId)

          reply
            .code(200)
            .type('application/json')
            .send({message: 'Role deleted'})
        }
      }
    )
}