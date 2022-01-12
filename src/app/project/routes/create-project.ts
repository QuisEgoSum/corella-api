import {FastifyInstance} from 'fastify'
import type {CreateProject} from '../schemas/entities'
import {BadRequest} from 'common/schemas/response'
import {ProjectRouteOptions} from './index'


interface CreateProjectRequest {
  Body: CreateProject
}


export async function createProject(
  fastify: FastifyInstance,
  {schemas, projectService}: ProjectRouteOptions
) {
  return fastify
    .route<CreateProjectRequest>(
      {
        url: '/project',
        method: 'POST',
        schema: {
          summary: 'Create project',
          tags: ['Project'],
          body: schemas.entities.CreateProject,
          response: {
            [201]: {
              description: 'Created project',
              type: 'object',
              properties: {
                project: schemas.entities.BaseProject
              },
              additionalProperties: false,
              required: ['project']
            },
            [400]: new BadRequest().bodyErrors()
          }
        },
        security: {
          auth: true
        },
        handler: async function(request, reply) {
          const project = await projectService.createProject(request.session.userId, request.body)

          reply
            .code(201)
            .type('application/json')
            .send({project})
        }
      }
    )
}