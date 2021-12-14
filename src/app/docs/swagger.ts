import {config} from 'core/config'
import {SwaggerOptions} from 'fastify-swagger'


export const swagger: SwaggerOptions = {
  mode: 'dynamic',
  exposeRoute: true,
  routePrefix: '/docs/swagger',
  hideUntagged: true,
  openapi: {
    info: {
      title: config.pkgJson.name,
      version: config.pkgJson.version
    },
    // consumes: ['application/json'],
    // produces: ['application/json'],
    components: {
      securitySchemes: {
        UserBearer: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header'
        }
      }
    },
    tags: [],
    // 'x-tagGroups': []
  }
}