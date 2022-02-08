import {ProjectService} from './ProjectService'
import {MemberEvents} from './packages/member/MemberEvents'
import {MemberService} from './packages/member/MemberService'
import {RoleEvents} from './packages/role/RoleEvents'


export async function addEventsListeners(
  projectService: ProjectService,
  memberService: MemberService,
  memberEvents: MemberEvents,
  roleEvents: RoleEvents
) {
  memberEvents
    .safeOn('CANCEL_INVITE', ((projectId, userId) => projectService.pullMemberId(projectId, userId)))
    .safeOn('ACCEPT_INVITE', ((projectId, userId) => projectService.pushMemberId(projectId, userId)))
  roleEvents
    .safeOn('DELETE_ROLE', ((projectId, roleId, defaultRole) => memberService.changeMembersRoleFrom(projectId, roleId, defaultRole)))
}