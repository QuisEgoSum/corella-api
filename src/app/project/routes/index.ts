import {loadRoutes} from 'utils/loader'
import type {FastifyInstance} from 'fastify'
import type {ProjectService} from '../ProjectService'


export interface ProjectRouteOptions {
  projectService: ProjectService,
  schemas: typeof import('app/project/schemas')
}


export async function routes(
  fastify: FastifyInstance,
  projectService: ProjectService,
  schemas: typeof import('app/project/schemas')
) {
  const routes = await loadRoutes<
    {[key: string]: (fastify: FastifyInstance, options: ProjectRouteOptions) => Promise<FastifyInstance>}
    >(__dirname)

  await Promise.all(routes.map(route => route(fastify, {projectService, schemas})))
}