import {loadRoutes} from '@utils/loader'
import type {FastifyInstance} from 'fastify'
import type {ProjectService} from '../ProjectService'


export interface ProjectRouteOptions {
  projectService: ProjectService,
  projectSchemas: typeof import('@app/project/schemas')
}


export async function routes(
  fastify: FastifyInstance,
  options: ProjectRouteOptions
) {
  const routes = await loadRoutes<(fastify: FastifyInstance, options: ProjectRouteOptions) => Promise<FastifyInstance>>(__dirname)

  await Promise.all(routes.map(route => route(fastify, options)))
}