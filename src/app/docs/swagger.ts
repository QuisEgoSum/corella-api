import {config} from 'core/config'


export const swagger: Record<string, any> = {
  mode: 'dynamic',
  exposeRoute: true,
  routePrefix: '/docs/swagger',
  hideUntagged: true,
  openapi: {
    info: {
      title: config.pkgJson.name,
      version: config.pkgJson.version
    },
    components: {
      securitySchemes: {
        UserSession: {
          type: 'apiKey',
          name: 'sessionId',
          in: 'cookie'
        }
      }
    },
    tags: [],
    'x-tagGroups': [
      {
        name: 'User',
        tags: [
          'User - Me',
          'User - Admin'
        ]
      }
    ]
  }
}