import { PackageCityDayResponse } from '@/modules/packages/dtos/packagecityday-response.dto';
import { PackageCityDayTravel } from '@/modules/packages/entities/packagecitydaytravel.entity';

export class PackageCityDayTravelResponse {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  packageCityDayId: string;
  type: string;
  carpooling?: string;
  vehicleType?: string;
  timeFrom?: string;
  timeTo?: string;
  description?: any;
  packageCityDay?: PackageCityDayResponse;

  constructor(packagecitydaytravel: PackageCityDayTravel) {
    if ('id' in packagecitydaytravel) this.id = packagecitydaytravel.id;
    if ('createdAt' in packagecitydaytravel) this.createdAt = packagecitydaytravel.createdAt;
    if ('updatedAt' in packagecitydaytravel) this.updatedAt = packagecitydaytravel.updatedAt;
    this.packageCityDayId = packagecitydaytravel.packageCityDayId;
    this.type = packagecitydaytravel.type;
    this.carpooling = packagecitydaytravel.carpooling || undefined;
    this.vehicleType = packagecitydaytravel.vehicleType || undefined;
    this.timeFrom = packagecitydaytravel.timeFrom || undefined;
    this.timeTo = packagecitydaytravel.timeTo || undefined;
    this.description = packagecitydaytravel.description || undefined;
    this.packageCityDay = packagecitydaytravel.packageCityDay && typeof packagecitydaytravel.packageCityDay === 'object' ? new PackageCityDayResponse({ ...(packagecitydaytravel.packageCityDay as any) }) : undefined;
  }
}
