import {FastifyInstance} from 'fastify'
import {UpdateTask} from '@app/project/packages/task/schemas/entities'
import * as schemas from '../schemas'
import {RolePermission} from '@app/project/packages/role'
import {TaskService} from '@app/project/packages/task/TaskService'


interface UpdateRequest {
  Params: {
    projectId: string,
    number: number
  },
  Body: UpdateTask
}


export async function update(fastify: FastifyInstance, service: TaskService) {
  return fastify
    .route<UpdateRequest>(
      {
        method: 'PATCH',
        url: '/project/:projectId/task/:number',
        schema: {
          summary: 'Update task',
          task: ['Project Task'],
          params: {
            projectId: schemas.properties.projectId,
            number: schemas.properties.number
          },
          body: schemas.entities.UpdateTask
        },
        security: {
          auth: true,
          project: RolePermission.PARTICIPATION_IN_TASKS
        },
        handler: async function(request, reply) {
          const task = await service.updateTask(request.params.projectId, request.params.number, request.body, request.session.userId)

          reply
            .code(200)
            .type('application/json')
            .send({task})
        }
      }
    )
}