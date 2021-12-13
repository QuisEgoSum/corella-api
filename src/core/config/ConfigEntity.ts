
export type PkgJson = {
  version: string
}


export class ConfigEntity {
  public pkgJson: PkgJson

  constructor(defaultConfig: ConfigEntity) {
    this.pkgJson = defaultConfig.pkgJson
  }
}