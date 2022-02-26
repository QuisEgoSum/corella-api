import {AssignedStatus, ITask} from '@app/project/packages/task/TaskModel'
import {model, Schema, Types} from 'mongoose'


export interface IHistory extends ITask {
  taskId: Types.ObjectId
}

const HistorySchema = new Schema<IHistory>(
  {
    taskId: {
      type: Schema.Types.ObjectId,
      ref: 'ProjectTask'
    },
    title: String,
    description: String,
    status: {
      type: Schema.Types.ObjectId,
      ref: 'ProjectTaskStatus'
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project'
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
    timestamps: false,
    versionKey: false
  }
)


export const HistoryModel = model<IHistory>('ProjectTaskHistory', HistorySchema, 'project_task_history')