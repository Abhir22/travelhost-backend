import moment from 'moment';

export class PackageStateResponseDto {
  id: string;
  packageType: string;
  stateId: string;
  state?: {
    id: string;
    name: string;
    countryId: string;
  };
  createdAt?: string;
  updatedAt?: string;

  constructor(packagestate: any) {
    this.id = packagestate.id;
    this.packageType = packagestate.packageType;
    this.stateId = packagestate.stateId;
    if (packagestate.state) {
      this.state = {
        id: packagestate.state.id,
        name: packagestate.state.name,
        countryId: packagestate.state.countryId,
      };
    }
    if ('createdAt' in packagestate && packagestate.createdAt) this.createdAt = moment(packagestate.createdAt).format('DD-MM-YYYY');
    if ('updatedAt' in packagestate && packagestate.updatedAt) this.updatedAt = moment(packagestate.updatedAt).format('DD-MM-YYYY');
  }
}
