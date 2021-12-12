import mongoose, {Model, Schema} from 'mongoose'
import BaseRepository from './BaseRepository'
import * as assert from 'assert'
import {before} from 'mocha'


interface IModel {
  _id: mongoose.Schema.Types.ObjectId,
  test: string,
  createdAt: number,
  updatedAt: number
}

const ModelSchema = new mongoose.Schema<IModel>(
  {
    test: {
      type: String
    },
    createdAt: {
      type: Number
    },
    updatedAt: Number
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const ModelModel = mongoose.model<IModel>('Model', ModelSchema, 'models')


const modelRepository = new BaseRepository<IModel>(ModelModel)


before(async () => {
  await mongoose.connect('mongodb://localhost/base-repository-test')
  console.log('Connection to database')
})

it('Create', async function() {
  const model = await modelRepository.create({test: 'test'})

  assert.equal('_id' in model, true, 'Exists _id in saved document')
  assert.equal('test' in model, true, 'Exists test in saved document')
  assert.equal('createdAt' in model, true, 'Exists createdAt in saved document')
  assert.equal('updatedAt' in model, true, 'Exists updatedAt in saved document')
})

it('Update one', async function() {
  const result = await modelRepository.updateOne()
})

