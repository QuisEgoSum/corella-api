import {Schema, model, Types} from 'mongoose'


export interface IStatus {
  _id: Types.ObjectId,
  projectId: Types.ObjectId,
  name: string,
  createdAt: number,
  updatedAt: number
}

const StatusSchema = new Schema<IStatus>(
  {
    projectId: Types.ObjectId,
    name: String,
    createdAt: Number,
    updatedAt: Number
  },
  {
    versionKey: false,
    timestamps: true
  }
)
  .index({projectId: 1, name: 1}, {unique: true})
  .index({projectId: 1})


export const StatusModel = model<IStatus>('ProjectTaskStatus', StatusSchema, 'project_task_statuses')