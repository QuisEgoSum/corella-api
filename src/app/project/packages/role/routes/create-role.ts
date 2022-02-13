import type {FastifyInstance} from 'fastify'
import type {RoleRouteOptions} from '.'
import type {CreateRole} from '../schemas/entities'
import {BadRequest} from '@common/schemas/response'


interface CreateRoleRequest {
  Params: {
    projectId: string
  },
  Body: CreateRole
}


export async function createRole(fastify: FastifyInstance, {roleService, roleSchemas}: RoleRouteOptions) {
  return fastify
    .route<CreateRoleRequest>(
      {
        url: '/project/:projectId/role',
        method: 'POST',
        schema: {
          summary: 'Create role',
          tags: ['Project Role'],
          params: {
            projectId: roleSchemas.properties.projectId
          },
          body: roleSchemas.entities.CreateRole,
          response: {
            [201]: {
              description: 'Created role',
              type: 'object',
              properties: {
                role: roleSchemas.entities.BaseRole
              },
              additionalProperties: false,
              required: ['role']
            },
            [400]: new BadRequest().bodyErrors()
          }
        },
        security: {
          auth: true
        },
        handler: async function(request, reply) {
          const role = await roleService.createRole(request.params.projectId, request.body)

          reply
            .code(201)
            .type( 'application/json')
            .send({role})
        }
      }
    )
}