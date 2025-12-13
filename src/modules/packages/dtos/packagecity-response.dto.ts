import moment from 'moment';
import { PackageResponse } from '@/modules/packages/dtos/package-response.dto';
import { PackageCityDayResponse } from '@/modules/packages/dtos/packagecityday-response.dto';
import { PackageCity } from '@/modules/packages/entities/packagecity.entity';

export class PackageCityResponse {
  id?: string;
  packageId: string;
  countryId: string;
  stateId?: string;
  cityId: string;
  totalDays: number;
  totalNights: number;
  package?: PackageResponse;
  packagecitydaies?: PackageCityDayResponse[];
  createdAt?: string;
  updatedAt?: string;

  constructor(packagecity: PackageCity) {
    if ('id' in packagecity && packagecity.id) this.id = packagecity.id;
    this.packageId = packagecity.packageId;
    this.countryId = packagecity.countryId;
    this.stateId = packagecity.stateId || undefined;
    this.cityId = packagecity.cityId;
    this.totalDays = packagecity.totalDays;
    this.totalNights = packagecity.totalNights;
    this.package = packagecity.package && typeof packagecity.package === 'object' ? new PackageResponse({ ...(packagecity.package as any) }) : undefined;
    this.packagecitydaies = Array.isArray(packagecity.packagecitydaies) ? packagecity.packagecitydaies.map((r: any) => new PackageCityDayResponse({ ...(r as any) })) : [];
    if ('createdAt' in packagecity && packagecity.createdAt) this.createdAt = moment(packagecity.createdAt).format('YYYY-MM-DD');
    if ('updatedAt' in packagecity && packagecity.updatedAt) this.updatedAt = moment(packagecity.updatedAt).format('YYYY-MM-DD');
  }
}
