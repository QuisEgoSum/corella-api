import {MemberService} from './MemberService'
import {MemberRepository} from './MemberRepository'
import {MemberModel} from './MemberModel'


export class Member {
  public readonly service: MemberService
  constructor(
    memberService: MemberService
  ) {
    this.service = memberService
  }
}


export async function initMember() {
  return new Member(new MemberService(new MemberRepository(MemberModel)))
}