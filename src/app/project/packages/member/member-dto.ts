import {PopulatedMember} from './MemberRepository'
import {Types} from 'mongoose'
import {MemberStatus} from './MemberStatus'


export class MemberDto {
  private _id: Types.ObjectId
  private readonly status: MemberStatus
  private user: {_id: Types.ObjectId; username: string; email: string | null; avatar: string}
  private role: {_id: Types.ObjectId; name: string}
  private createdAt: number
  constructor(member: PopulatedMember) {
    this._id = member._id
    this.status = member.status
    this.user = member.userId
    this.role = member.roleId
    this.createdAt = member.createdAt
    if (this.status !== MemberStatus.PARTICIPANT) {
      this.user.email = null
    }
  }
}