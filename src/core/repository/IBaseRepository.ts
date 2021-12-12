import {
  FilterQuery,
  QueryOptions,
  Types,
  UpdateQuery,
  UpdateWithAggregationPipeline,
  UpdateWriteOpResult
} from 'mongoose'


export type Optional<T> = {
  [P in keyof T]?: T[P]
}


export default interface IBaseRepository<T> {

  /**
   * @throws {UniqueKeyError}
   */
  create(entity: T): Promise<T>

  findOne(query: FilterQuery<T>, projection?: unknown | null, options?: QueryOptions | null,): Promise<T | null>

  updateOne(filter?: FilterQuery<T>, update?: UpdateQuery<T> | UpdateWithAggregationPipeline, options?: QueryOptions | null): Promise<UpdateWriteOpResult>

  find(): Promise<T[] | []>

  deleteOne(query: FilterQuery<T>): Promise<boolean>

  deleteById(id: string | Types.ObjectId): Promise<boolean>
}