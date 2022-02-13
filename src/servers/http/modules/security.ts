import {FastifyRequest, RouteOptions} from 'fastify'
import type {UserSession} from '@app/user/packages/session/SessionModel'
import type {User} from '@app/user'
import {Project} from '@app/project'
import {SecurityPermission} from '@app/project/packages/security'


declare module 'fastify' {
  interface FastifyRequest {
    session: UserSession
  }
  interface RouteOptions {
    security: {
      auth: boolean,
      admin?: boolean,
      project?: SecurityPermission | false
    }
  }
}

export interface CreateSecurityHookOptions {
  user: User,
  project: Project
}


export async function createSecurityHook({user, project}: CreateSecurityHookOptions) {
  async function auth(request: FastifyRequest) {
    request.session = await user.authorization(request.cookies.sessionId)
  }

  async function isAdmin(request: FastifyRequest) {
    if (request.session?.userRole !== user.UserRole.ADMIN) {
      throw new user.error.UserRightsError()
    }
  }

  function createProjectSecurity(permission: SecurityPermission) {
    return async function projectSecurity(request: FastifyRequest<{Params: {projectId: string}}>) {
      await project.verifyAccess(request.params.projectId, request.session.userId, permission)
    }
  }

  return function securityHook(routeOptions: RouteOptions) {
    if (!routeOptions.onRequest) {
      routeOptions.onRequest = []
    } else if (typeof routeOptions.onRequest === 'function') {
      routeOptions.onRequest = [routeOptions.onRequest]
    }
    if (routeOptions.security?.project) {
      if (!routeOptions.schema) {
        routeOptions.schema = {}
      }
      if (!routeOptions.schema.params) {
        routeOptions.schema.params = {}
      }
      if (!routeOptions.schema.params.projectId) {
        routeOptions.schema.params.projectId = project.schemas.properties._id
      }
      // @ts-ignore
      routeOptions.onRequest.unshift(createProjectSecurity(routeOptions.security.project))
    }
    if (routeOptions.security?.admin) {
      routeOptions.onRequest.unshift(isAdmin)
    }
    if (routeOptions.security?.auth) {
      routeOptions.onRequest.unshift(auth)
    }
  }
}