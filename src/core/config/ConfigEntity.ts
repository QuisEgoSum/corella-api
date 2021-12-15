import path from 'path'


export type PkgJson = {
  readonly name: string,
  readonly version: string
}

export type ConfigPaths = {
  readonly shareStatic: string,
  readonly root: string
}

export type ConfigServer = {
  readonly http: {
    readonly protocol: 'http' | 'https',
    readonly host: string,
    readonly port: number
  }
}

export type LoggerConfig = {
  readonly pretty: boolean,
  readonly isoTime: boolean,
  readonly time: boolean,
  readonly level: 'info' | 'debug'
}

export type UserConfig = {
  readonly session: {
    readonly maximum: number
  },
  readonly superadmin: {
    readonly password: string,
    readonly username: string,
    readonly email: string
  }
}

export type DatabaseConfig = {
  readonly credentials: {
    readonly connectionString: string
  },
  options: {
    useNewUrlParser: boolean,
    useUnifiedTopology: boolean,
    ignoreUndefined: boolean,
    keepAlive: boolean
  }
}

export class ConfigEntity {
  public readonly production: boolean
  public readonly pkgJson: PkgJson
  public readonly paths: ConfigPaths
  public readonly server: ConfigServer
  public readonly logger: LoggerConfig
  public readonly user: UserConfig
  public readonly database: DatabaseConfig

  constructor(defaultConfig: ConfigEntity) {
    this.production = defaultConfig.production
    this.pkgJson = defaultConfig.pkgJson
    this.server = defaultConfig.server
    this.logger = defaultConfig.logger
    this.user = defaultConfig.user
    this.database = defaultConfig.database

    const rootDir = path.resolve(__dirname, '../../../')

    this.paths = {
      root: rootDir,
      shareStatic: path.resolve(rootDir, 'static/share')
    }
  }
}