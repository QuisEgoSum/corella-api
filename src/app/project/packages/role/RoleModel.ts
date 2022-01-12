import {Schema, model, Types} from 'mongoose'
import {RolePermission} from './RolePermission'


export interface IRole {
  _id: Types.ObjectId,
  name: string,
  projectId: Types.ObjectId,
  permissions: RolePermission[],
  allowedEdit: boolean,
  createdAt: number,
  updatedAt: number
}


const RoleSchema = new Schema<IRole>(
  {
    name: {
      type: String
    },
    projectId: {
      type: Schema.Types.ObjectId
    },
    // TODO: Check support typescript enum for mongoose type
    // @ts-ignore
    permissions: {
      type: [{
        type: String,
        enum: Object.values(RolePermission)
      }]
    },
    allowedEdit: {
      type: Boolean,
      default: true
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
  .index({projectId: 1})


export const RoleModel = model<IRole>('ProjectRole', RoleSchema, 'project_roles')