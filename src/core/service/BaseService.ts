import {BaseRepository, BaseRepositoryError} from 'core/repository'
import {EntityExistsError, EntityNotExistsError, NoDataForUpdatingError} from 'core/error'
import type {Optional} from 'core/repository/IBaseRepository'
import type {IBaseService} from './IBaseService'
import type {Types} from 'mongoose'
import {QueryOptions} from 'mongoose'


export class BaseService<T, R extends BaseRepository<T>> implements IBaseService<T, R> {

  public Error: {
    EntityExistsError: typeof EntityExistsError,
    EntityNotExistsError: typeof EntityNotExistsError
  }

  public repository: R

  constructor(repository: R) {
    this.repository = repository
    this.Error = {
      EntityExistsError: EntityExistsError,
      EntityNotExistsError: EntityNotExistsError
    }
  }

  errorHandler(error: Error | BaseRepositoryError): T {
    if (error instanceof BaseRepositoryError.UniqueKeyError) {
      throw new this.Error.EntityExistsError(error)
    } else {
      throw error
    }
  }

  private checkUpdateData(data: {[key: string]: any}) {
    if (!Object.keys(data).length) {
      throw new NoDataForUpdatingError()
    }
  }

  async create(entity: Optional<T>): Promise<T> {
    return this.repository.create(entity)
      .catch(error => this.errorHandler(error))
  }

  async deleteById(id: string): Promise<void> {
    const isDeleted = await this.repository.deleteById(id)

    if (!isDeleted) {
      throw new this.Error.EntityNotExistsError()
    }
  }

  async findById(id: string | Types.ObjectId, projection?: unknown | null, options?: QueryOptions | null): Promise<T> {
    const document = await this.repository.findById(id, projection, options)

    if (document === null) {
      throw new this.Error.EntityNotExistsError()
    }

    return document
  }

  async findByIdAndDelete(id: string | Types.ObjectId): Promise<T> {
    const document = await this.repository.findByIdAndDelete(id)

    if (document === null) {
      throw new this.Error.EntityNotExistsError()
    }

    return document
  }

  async findByIdAndUpdate(id: string | Types.ObjectId, update: Optional<T>): Promise<T> {
    this.checkUpdateData(update)
    const document = await this.repository.findByIdAndUpdate(id, update, {new: true})

    if (document === null) {
      throw new this.Error.EntityNotExistsError()
    }

    return document
  }
}