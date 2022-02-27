import {FastifyInstance} from 'fastify'
import {TaskService} from '@app/project/packages/task/TaskService'
import * as schemas from '../schemas'
import {QueryPageLimit, QueryPageNumber} from '@common/schemas/query'
import {FindTasksQuery} from '@app/project/packages/task/schemas/entities'


interface FindRequest {
  Params: {
    projectId: string
  },
  Querystring: FindTasksQuery
}


export async function find(fastify: FastifyInstance, service: TaskService) {
  return fastify
    .route<FindRequest>(
      {
        method: 'GET',
        url: '/project/:projectId/tasks',
        schema: {
          summary: 'Find tasks',
          tags: ['Project Task'],
          params: {
            projectId: schemas.properties.projectId
          },
          query: {
            type: 'object',
            properties: {
              status: schemas.properties.status,
              limit: new QueryPageLimit().setDefault(100),
              page: new QueryPageNumber().setDefault(1)
            },
            additionalProperties: false,
            required: ['limit', 'page']
          }
        },
        security: {
          auth: true,
          project: 'MEMBER'
        },
        handler: async function(request, reply) {
          const tasks = await service.find(request.params.projectId, request.query)

          reply
            .code(200)
            .type('application/json')
            .send(tasks)
        }
      }
    )
}