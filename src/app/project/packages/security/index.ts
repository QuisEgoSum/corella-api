import * as error from './secutiry-error'
import {RolePermission} from '@app/project/packages/role'
import {SecurityService} from '@app/project/packages/security/SecurityService'
import type {ProjectService} from '@app/project/ProjectService'


export type SecurityPermission = RolePermission | 'MEMBER'


class Security {
  public readonly service: SecurityService
  constructor(
    securityService: SecurityService
  ) {
    this.service = securityService
  }
}


export async function initSecurity(projectService: ProjectService) {
  return new Security(new SecurityService(projectService))
}

export type {
  Security
}

export {
  error
}