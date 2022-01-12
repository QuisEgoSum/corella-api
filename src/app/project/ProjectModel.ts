import {Schema, model, Types} from 'mongoose'


export interface IProject {
  _id: Types.ObjectId,
  name: string,
  members: Types.ObjectId[],
  createdAt: number,
  updatedAt: number
}


const ProjectSchema = new Schema<IProject>(
  {
    name: {
      type: String
    },
    members: {
      type: [Types.ObjectId],
      ref: 'User'
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
  .index({name: 1})
  .index({name: 1, createdAt: 1})
  .index({members: 1})


export const ProjectModel = model<IProject>('Project', ProjectSchema, 'projects')