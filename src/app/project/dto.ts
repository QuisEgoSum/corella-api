import {AggregatedProjectMemberResult} from '@app/project/ProjectRepository'
import {Types} from 'mongoose'
import {MemberStatus} from '@app/project/packages/member/MemberStatus'
import {RolePermission} from '@app/project/packages/role'


export class ProjectMember {
  public _id: Types.ObjectId
  public member: null | {
    _id: Types.ObjectId;
    projectId: Types.ObjectId;
    status: MemberStatus
    role: null | {
      permissions: RolePermission
    }
  }
  constructor(project: AggregatedProjectMemberResult) {
    this._id = project._id
    if (project.member.length) {
      this.member = {
        _id: project.member[0]._id,
        projectId: project.member[0].projectId,
        status: project.member[0].status,
        role: null
      }
      if (project.member[0].role.length) {
        this.member.role = project.member[0].role[0]
      }
    } else {
      this.member = null
    }
  }
}