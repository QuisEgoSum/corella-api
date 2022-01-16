import {ProjectService} from './ProjectService'
import {MemberEvents} from './packages/member/MemberEvents'


export async function addEventsListeners(
  projectService: ProjectService,
  memberEvents: MemberEvents
) {
  memberEvents.safeOn('INVITE_MEMBER', (projectId, memberId) => projectService.setMember(projectId, memberId))
}