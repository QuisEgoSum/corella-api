import {FastifyInstance} from 'fastify'
import {CreateTask} from '@app/project/packages/task/schemas/entities'
import {RolePermission} from '@app/project/packages/role'
import {TaskService} from '@app/project/packages/task/TaskService'
import * as schemas from '../schemas'
import {BadRequest, NotFound} from '@common/schemas/response'
import {DefaultStatusNotExistError} from '@app/project/packages/task/packages/status/packages/modifier/modifier-error'


interface CreateRequest {
  Params: {
    projectId: string
  },
  Body: CreateTask
}


export async function create(fastify: FastifyInstance, service: TaskService) {
  return fastify
    .route<CreateRequest>(
      {
        method: 'POST',
        url: '/project/:projectId/task',
        schema: {
          summary: 'Create task',
          tags: ['Project Task'],
          body: schemas.entities.CreateTask,
          params: {
            projectId: schemas.properties.projectId
          },
          response: {
            [201]: {
              description: 'Created task',
              type: 'object',
              properties: {
                task: schemas.entities.BaseTask
              },
              additionalProperties: false,
              required: ['task']
            },
            [400]: new BadRequest().bodyErrors(),
            [404]: new NotFound(DefaultStatusNotExistError.schema())
          }
        },
        security: {
          auth: true,
          project: RolePermission.MANAGING_TASKS
        },
        handler: async function(request, reply) {
          const task = await service.createTask(request.params.projectId, request.body, request.session.userId)

          reply
            .code(201)
            .type('application/json')
            .send({task})
        }
      }
    )
}