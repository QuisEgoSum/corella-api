import {model, Schema, Types} from 'mongoose'

export enum AssignedStatus {
  NEW = 'NEW',
  DONE = 'DONE'
}

export interface ITaskAssigned {
  _id: Types.ObjectId,
  userId: Types.ObjectId,
  roleId: Types.ObjectId,
  status: AssignedStatus
}

export interface ITask {
  _id: Types.ObjectId,
  title: string,
  description: string,
  status: Types.ObjectId,
  projectId: Types.ObjectId,
  assigned: ITaskAssigned[],
  number: number,
  version: number,
  creatorId: Types.ObjectId,
  editorId: Types.ObjectId,
  editors: Types.ObjectId[],
  createdAt: number,
  updatedAt: number
}


const TaskSchema = new Schema<ITask>(
  {
    title: String,
    description: String,
    status: {
      type: Schema.Types.ObjectId,
      ref: 'ProjectTaskStatus'
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      select: false
    },
    assigned: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        },
        roleId: {
          type: Schema.Types.ObjectId,
          // ref: 'ProjectTaskRole'
        },
        status: {
          type: String,
          enum: Object.values(AssignedStatus)
        }
      }
    ],
    number: Number,
    version: {
      type: Number,
      default: 1
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    editorId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    editors: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
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
  .index({number: 1, projectId: 1}, {unique: true})
  .index({number: 1})
  .index({createdAt: -1})
  .index({status: 1, projectId: 1})


export const TaskModel = model<ITask>('ProjectTask', TaskSchema, 'project_tasks')