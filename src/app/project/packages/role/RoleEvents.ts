import {Events} from '@common/events'
import {Types} from 'mongoose'


export declare interface RoleEvents extends Events {
  emit(event: 'DELETE_ROLE', projectId: Types.ObjectId | string, roleId: Types.ObjectId | string, defaultRole: Types.ObjectId): boolean
  safeOn(event: 'DELETE_ROLE', listener: (projectId: Types.ObjectId | string, roleId: Types.ObjectId | string, defaultRole: Types.ObjectId | string) => void): this
}


export class RoleEvents extends Events {
  constructor() {
    super()
  }
}