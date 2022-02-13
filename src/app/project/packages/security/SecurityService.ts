import {SecurityPermission} from '.'
import type {ProjectService} from '@app/project/ProjectService'
import {Types} from 'mongoose'
import {
  InsufficientPermissionsInProjectError,
  NotMemberOfProjectError,
  RoleNotFoundError
} from '@app/project/packages/security/secutiry-error'
import {MemberStatus} from '@app/project/packages/member/MemberStatus'


export class SecurityService {
  private projectService: ProjectService
  constructor(
    projectService: ProjectService
  ) {
    this.projectService = projectService
  }

  async verifyAccess(projectId: string | Types.ObjectId, userId: string | Types.ObjectId, permission: SecurityPermission) {
    const project = await this.projectService.findProjectMember(projectId, userId)
    if (
          !project.member
      ||  String(projectId) !== String(project.member.projectId)
      ||  project.member.status !== MemberStatus.PARTICIPANT
    ) {
      throw new NotMemberOfProjectError()
    }
    if (!project.member.role) {
      throw new RoleNotFoundError()
    }
    if (permission === 'MEMBER') {
      return
    }
    if (project.member.role.permissions.indexOf(permission) === -1) {
      throw new InsufficientPermissionsInProjectError()
    }
  }
}