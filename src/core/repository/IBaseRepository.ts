import type {
  FilterQuery,
  QueryOptions,
  Types,
  UpdateQuery,
  UpdateWithAggregationPipeline,
  UpdateWriteOpResult
} from 'mongoose'
import type DataList from './DataList'


export type Optional<T> = {
  [P in keyof T]?: T[P]
}

export type PageOptions = {
  limit: number,
  page: number
}

export default interface IBaseRepository<T> {

  /**
   * @throws {UniqueKeyError}
   */
  create(entity: T): Promise<T>

  findOne(query: FilterQuery<T>, projection?: unknown | null, options?: QueryOptions | null,): Promise<T | null>

  updateOne(filter?: FilterQuery<T>, update?: UpdateQuery<T> | UpdateWithAggregationPipeline, options?: QueryOptions | null): Promise<UpdateWriteOpResult>

  findPage(page: PageOptions, filter: FilterQuery<T>, projection?: any | null, options?: QueryOptions | null): Promise<DataList<T>>

  deleteOne(query: FilterQuery<T>): Promise<boolean>

  deleteById(id: string | Types.ObjectId): Promise<boolean>
}