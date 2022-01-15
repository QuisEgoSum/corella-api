import {Schema, model, Types} from 'mongoose'
import {MemberStatus} from './MemberStatus'


export interface IMember {
  _id: Types.ObjectId,
  projectId: Types.ObjectId,
  userId: Types.ObjectId,
  roleId: Types.ObjectId,
  status: MemberStatus,
  createdAt: number,
  updatedAt: number
}


const MemberSchema = new Schema<IMember>(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    roleId: {
      type: Schema.Types.ObjectId,
      ref: 'ProjectRole'
    },
    status: {
      type: String,
      enum: Object.values(MemberStatus)
    },
    createdAt: {
      type: Number
    },
    updatedAt: {
      type: Number
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
  .index({projectId: 1, userId: 1}, {unique: true})


export const MemberModel = model<IMember>('ProjectMember', MemberSchema, 'project_members')