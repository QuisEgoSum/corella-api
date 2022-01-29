import type {FastifyInstance} from 'fastify'
import type {RoleRouteOptions} from './index'
import {BadRequestNoBody, DataList} from 'common/schemas/response'
import {QueryPageLimit, QueryPageNumber} from 'common/schemas/query'


interface GetRolesRequest {
  Params: {
    projectId: string
  },
  Querystring: {
    page: number,
    limit: number
  }
}


export async function getRoles(fastify: FastifyInstance, {roleService, roleSchemas}: RoleRouteOptions) {
  return fastify
    .route<GetRolesRequest>(
      {
        url: '/project/:projectId/roles',
        method: 'GET',
        schema: {
          summary: 'Get project role list',
          tags: ['Project Role'],
          params: {
            projectId: roleSchemas.properties.projectId
          },
          query: {
            page: new QueryPageNumber().setDefault(1),
            limit: new QueryPageLimit().setDefault(10)
          },
          response: {
            [200]: new DataList(roleSchemas.entities.BaseRole),
            [400]: new BadRequestNoBody()
          }
        },
        security: {
          auth: true
        },
        handler: async function(request, reply) {
          const response = await roleService.findRoles(request.params.projectId, request.query)

          reply
            .code(201)
            .type( 'application/json')
            .send(response)
        }
      }
    )
}