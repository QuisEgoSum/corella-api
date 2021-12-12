import config from '../../core/config/config'


export default {
  exposeRoute: true,
  routePrefix: '/docs/swagger',
  hideUntagged: true,
  openapi: {
    info: {
      title: config,
      version: config.pkgJson.version
    },
    consumes: ['application/json'],
    produces: ['application/json'],
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
    'x-tagGroups': []
  }
}