export class PackageStateResponseDto {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  packageTypeId: string;
  stateId: string;
  state?: {
    id: string;
    name: string;
    countryId: string;
  };

  constructor(packagestate: any) {
    this.id = packagestate.id;
    if ('createdAt' in packagestate) this.createdAt = packagestate.createdAt;
    if ('updatedAt' in packagestate) this.updatedAt = packagestate.updatedAt;
    this.packageTypeId = packagestate.packageTypeId;
    this.stateId = packagestate.stateId;
    if (packagestate.state) {
      this.state = {
        id: packagestate.state.id,
        name: packagestate.state.name,
        countryId: packagestate.state.countryId,
      };
    }
  }
}