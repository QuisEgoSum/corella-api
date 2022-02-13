import {FastifyInstance} from 'fastify'
import {ProjectRouteOptions} from '.'
import {BadRequestNoBody, DataList} from '@common/schemas/response'
import {QueryPageLimit, QueryPageNumber} from '@common/schemas/query'


interface GetProjectsRequest {
  Querystring: {
    page: number,
    limit: number
  }
}


export async function getProjects(fastify: FastifyInstance, {projectService, projectSchemas}: ProjectRouteOptions) {
  return fastify
    .route<GetProjectsRequest>(
      {
        url: '/projects',
        method: 'GET',
        schema: {
          summary: 'Get projects',
          tags: ['Project'],
          query: {
            limit: new QueryPageLimit().setDefault(10),
            page: new QueryPageNumber().setDefault(1)
          },
          response: {
            [200]: new DataList(projectSchemas.entities.ExpandProjectPreview),
            [400]: new BadRequestNoBody()
          }
        },
        security: {
          auth: true
        },
        handler: async function(request, reply) {
          const list = await projectService.findUserProjects(request.session.userId, request.query)

          reply
            .code(200)
            .type('application/json')
            .send(list)
        }
      }
    )
}