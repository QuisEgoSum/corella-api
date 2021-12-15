import type {Optional, PageOptions} from 'core/repository/IBaseRepository'
import type {DataList} from 'core/data'
import type {BaseRepository} from '../repository'


export interface IBaseService<T, R extends BaseRepository<T>> {
  repository: R

  /**
   * @throws {EntityExistsError}
   */
  create(entity: Optional<T>): Promise<T>

  /**
   * @throws {EntityNotExistsError}
   */
  findById(id: string): Promise<T>

  /**
   * @throws {EntityExistsError | EntityNotExistsError}
   */
  findByIdAndUpdate(id: string, update: Optional<T>): Promise<T>

  /**
   * @throws {EntityNotExistsError}
   */
  findByIdAndDelete(id: string): Promise<T>

  /**
   * @throws {EntityNotExistsError}
   */
  deleteById(id: string): Promise<void>

  findPage(page: PageOptions): Promise<DataList<T>>
}