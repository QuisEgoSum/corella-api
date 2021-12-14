import path from 'path'


export type PkgJson = {
  name: string,
  version: string
}

export type ConfigPaths = {
  shareStatic: string,
  root: string
}

export type ConfigServer = {
  http: {
    protocol: 'http' | 'https',
    host: string,
    port: number
  }
}

export type LoggerConfig = {
  pretty: boolean,
  isoTime: boolean,
  time: boolean
}

export class ConfigEntity {
  public production: boolean
  public pkgJson: PkgJson
  public paths: ConfigPaths
  public server: ConfigServer
  public logger: LoggerConfig

  constructor(defaultConfig: ConfigEntity) {
    this.production = defaultConfig.production
    this.pkgJson = defaultConfig.pkgJson
    this.server = defaultConfig.server
    this.logger = defaultConfig.logger

    const rootDir = path.resolve(__dirname, '../../../')

    this.paths = {
      root: rootDir,
      shareStatic: path.resolve(rootDir, 'static/share')
    }
  }
}