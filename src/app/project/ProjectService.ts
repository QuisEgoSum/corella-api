import {BaseService} from '@core/service'
import {IProject} from './ProjectModel'
import {ProjectRepository} from './ProjectRepository'
import {ProjectNotExists} from './project-error'
import {Types} from 'mongoose'
import type {CreateProject} from './schemas/entities'
import type {RoleService} from './packages/role/RoleService'
import type {CounterService} from './packages/task/packages/counter/CounterService'
import {MemberService} from './packages/member/MemberService'
import {PageOptions} from '@core/repository/IBaseRepository'
import {ProjectMember} from '@app/project/dto'
import {StatusService} from '@app/project/packages/task/packages/status/StatusService'


export class ProjectService extends BaseService<IProject, ProjectRepository> {
  private roleService: RoleService
  private counterService: CounterService
  private memberService: MemberService
  private taskStatusService: StatusService

  constructor(
    projectRepository: ProjectRepository,
    roleService: RoleService,
    counterService: CounterService,
    taskStatusService: StatusService,
    memberService: MemberService
  ) {
    super(projectRepository)

    this.Error.EntityNotExistsError = ProjectNotExists

    this.roleService = roleService
    this.counterService = counterService
    this.taskStatusService = taskStatusService
    this.memberService = memberService
  }

  async createProject(ownerId: Types.ObjectId | string, createProject: CreateProject) {
    const project = await this.create(
      {
        name: createProject.name,
        members: [new Types.ObjectId(ownerId)]
      }
    )

    const [maintainerRole] = await Promise.all([
      this.roleService.createMaintainer(project._id),
      this.roleService.createGuest(project._id),
      this.counterService.createCounter(project._id),
      this.taskStatusService.createDefault(project._id)
    ])

    await this.memberService.addMember(project._id, ownerId, maintainerRole._id)

    return project
  }

  async findUserProjects(userId: Types.ObjectId | string, query: PageOptions) {
    return this.repository.findUserProjects(new Types.ObjectId(userId), query)
  }

  async pullMemberId(projectId: Types.ObjectId | string, userId: Types.ObjectId | string) {
    return this.repository.pullMemberId(projectId, userId)
  }

  async pushMemberId(projectId: Types.ObjectId, userId: Types.ObjectId) {
    return this.repository.pushMemberId(projectId, userId)
  }

  async findProjectMember(projectId: string | Types.ObjectId, userId: string | Types.ObjectId): Promise<ProjectMember> {
    const projects = await this.repository.findProjectMember(projectId, userId)
    if (projects.length) {
      return new ProjectMember(projects[0])
    }
    throw new this.Error.EntityNotExistsError()
  }
}