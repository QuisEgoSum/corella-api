import {Schema, model, Types} from 'mongoose'
import {NotificationType} from './NotificationType'


export interface IProjectInviteNotification {
  description: string,
  userId: Types.ObjectId,
  type: NotificationType,
  inviteId: Types.ObjectId,
  projectId: Types.ObjectId
  createdAt: number
}


const NotificationSchema = new Schema<IProjectInviteNotification>(
  {
    description: {
      type: String
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    type: {
      type: String,
      enum: Object.values(NotificationType)
    },
    inviteId: {
      type: Schema.Types.ObjectId,
      ref: 'ProjectMemberInvite'
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    },
    createdAt: {
      type: Number
    }
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: false
    }
  }
)


export const NotificationModel = model<IProjectInviteNotification>('UserNotification', NotificationSchema, 'user_notifications')