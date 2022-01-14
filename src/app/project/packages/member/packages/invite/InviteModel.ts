import {Schema, model, Types} from 'mongoose'
import {InviteStatus} from './InviteStatus'


export interface IInvite {
  _id: Types.ObjectId,
  userId: Types.ObjectId,
  projectId: Types.ObjectId,
  roleId: Types.ObjectId,
  status: InviteStatus,
  expiresAt?: number,
  createdAt: number
}


const InviteSchema = new Schema<IInvite>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    },
    roleId: {
      type: Schema.Types.ObjectId,
      ref: 'ProjectRole'
    },
    status: {
      type: String,
      enum: Object.values(InviteStatus)
    },
    expiresAt: {
      type: Number
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


export const InviteModel = model<IInvite>('ProjectMemberInvite', InviteSchema, 'project_member_invitations')