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
  memberEvents.safeOn('INVITE_MEMBER', (projectId, memberId) => projectService.setMember(projectId, memberId))
  roleEvents.safeOn('DELETE_ROLE', ((projectId, roleId, defaultRole) => memberService.fromToChangeMembersRole(projectId, roleId, defaultRole)))
}