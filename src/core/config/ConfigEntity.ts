
export type PkgJson = {
  version: string
}


export default class ConfigEntity {
  public pkgJson: PkgJson

  constructor(defaultConfig: ConfigEntity) {
    this.pkgJson = defaultConfig.pkgJson
  }
}