import {BaseService} from 'core/service'
import {IProject} from './ProjectModel'
import {ProjectRepository} from './ProjectRepository'
import {ProjectNotExists} from './project-error'
import {Types} from 'mongoose'
import type {CreateProject} from './schemas/entities'
import type {RoleService} from './packages/role/RoleService'
import type {CounterService} from './packages/task/packages/counter/CounterService'
import {MemberService} from './packages/member/MemberService'


export class ProjectService extends BaseService<IProject, ProjectRepository> {
  private roleService: RoleService
  private counterService: CounterService
  private memberService: MemberService

  constructor(
    projectRepository: ProjectRepository,
    roleService: RoleService,
    counterService: CounterService,
    memberService: MemberService
  ) {
    super(projectRepository)

    this.Error.EntityNotExistsError = ProjectNotExists

    this.roleService = roleService
    this.counterService = counterService
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
      this.counterService.createCounter(project._id),
    ])

    await this.memberService.addMember(project._id, ownerId, maintainerRole._id)

    return project
  }
}