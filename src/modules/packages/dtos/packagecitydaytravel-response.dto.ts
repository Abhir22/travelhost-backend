import moment from 'moment';
import { PackageCityDayResponse } from '@/modules/packages/dtos/packagecityday-response.dto';
import { PackageCityDayTravel } from '@/modules/packages/entities/packagecitydaytravel.entity';

export class PackageCityDayTravelResponse {
  id?: string;
  packageCityDayId: string;
  type: string;
  carpooling?: string;
  vehicleType?: string;
  timeFrom?: string;
  timeTo?: string;
  description?: any;
  packageCityDay?: PackageCityDayResponse;
  createdAt?: string;
  updatedAt?: string;

  constructor(packagecitydaytravel: PackageCityDayTravel) {
    if ('id' in packagecitydaytravel && packagecitydaytravel.id) this.id = packagecitydaytravel.id;
    this.packageCityDayId = packagecitydaytravel.packageCityDayId;
    this.type = packagecitydaytravel.type;
    this.carpooling = packagecitydaytravel.carpooling || undefined;
    this.vehicleType = packagecitydaytravel.vehicleType || undefined;
    this.timeFrom = packagecitydaytravel.timeFrom || undefined;
    this.timeTo = packagecitydaytravel.timeTo || undefined;
    this.description = packagecitydaytravel.description || undefined;
    this.packageCityDay = packagecitydaytravel.packageCityDay && typeof packagecitydaytravel.packageCityDay === 'object' ? new PackageCityDayResponse({ ...(packagecitydaytravel.packageCityDay as any) }) : undefined;
    if ('createdAt' in packagecitydaytravel && packagecitydaytravel.createdAt) this.createdAt = moment(packagecitydaytravel.createdAt).format('DD-MM-YYYY');
    if ('updatedAt' in packagecitydaytravel && packagecitydaytravel.updatedAt) this.updatedAt = moment(packagecitydaytravel.updatedAt).format('DD-MM-YYYY');
  }
}
