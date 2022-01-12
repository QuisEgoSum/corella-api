import {MemberService} from './MemberService'
import {MemberRepository} from './MemberRepository'
import {MemberModel} from './MemberModel'


export async function initMember() {
  const service = new MemberService(new MemberRepository(MemberModel))

  return {
    service
  }
}