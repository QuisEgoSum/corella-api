import {Events} from 'common/events'
import {Types} from 'mongoose'


export declare interface MemberEvents extends Events {
  emit(event: 'INVITE_MEMBER', projectId: Types.ObjectId, memberId: Types.ObjectId): boolean
  safeOn(event: 'INVITE_MEMBER', listener: (projectId: Types.ObjectId, memberId: Types.ObjectId) => any): this
  emit(event: 'CANCEL_INVITE', projectId: Types.ObjectId, userId: Types.ObjectId): boolean
  safeOn(event: 'CANCEL_INVITE', listener: (projectId: Types.ObjectId, userId: Types.ObjectId) => any): this
}


export class MemberEvents extends Events {
  constructor() {
    super()
  }
}