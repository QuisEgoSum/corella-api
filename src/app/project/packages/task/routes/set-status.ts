import {FastifyInstance} from 'fastify'
import {TaskService} from '@app/project/packages/task/TaskService'
import {RolePermission} from '@app/project/packages/role'
import * as schemas from '../schemas'


interface SetStatusRequest {
  Params: {
    projectId: string,
    number: number
  },
  Body: {
    status: string
  }
}


export async function setStatus(fastify: FastifyInstance, service: TaskService) {
  return fastify
    .route(
      {
        method: 'GET',
        url: '/project/:projectId/task/:number/status',
        schema: {
          summary: 'Set task status',
          tags: ['Project Task'],
          params: {
            projectId: schemas.properties.projectId,
            number: schemas.properties.number
          },
          body: {
            type: 'object',
            properties: {
              status: schemas.properties.status
            },
            additionalProperties: false,
            required: ['status']
          }
        },
        security: {
          auth: true,
          project: RolePermission.PARTICIPATION_IN_TASKS
        },
        handler: async function(request, reply) {
          reply
            .code(501)
            .type('application/json')
            .send({message: 'Not implemented'})
        }
      }
    )
}