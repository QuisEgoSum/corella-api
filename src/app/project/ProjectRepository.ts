import {BaseRepository} from 'core/repository'
import type {ProjectModel} from './ProjectModel'
import {IProject} from './ProjectModel'


export class ProjectRepository extends BaseRepository<IProject> {
  constructor(Model: typeof ProjectModel) {
    super(Model)
  }
}