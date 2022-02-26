import {Schema, model, Types} from 'mongoose'


export interface IProject {
  _id: Types.ObjectId,
  title: string,
  name: string,
  description: string,
  members: Types.ObjectId[],
  createdAt: number,
  updatedAt: number
}


const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      minlength: 1,
      maxLength: 128
    },
    name: {
      type: String,
      minlength: 1,
      maxlength: 24
    },
    description: {
      type: String,
      minlength: 1,
      maxlength: 8192
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
  .index({name: 1}, {unique: true})
  .index({name: 1, createdAt: 1})
  .index({members: 1})


export const ProjectModel = model<IProject>('Project', ProjectSchema, 'projects')