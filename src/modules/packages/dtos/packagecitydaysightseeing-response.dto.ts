import { PackageCityDayResponse } from '@/modules/packages/dtos/packagecityday-response.dto';
import { PackageCityDaySightseeing } from '@/modules/packages/entities/packagecitydaysightseeing.entity';

export class PackageCityDaySightseeingResponse {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  packageCityDayId: string;
  sightseeingName: string;
  ticket?: string;
  timeFrom?: string;
  timeTo?: string;
  packageCityDay?: PackageCityDayResponse;

  constructor(packagecitydaysightseeing: PackageCityDaySightseeing) {
    if ('id' in packagecitydaysightseeing) this.id = packagecitydaysightseeing.id;
    if ('createdAt' in packagecitydaysightseeing) this.createdAt = packagecitydaysightseeing.createdAt;
    if ('updatedAt' in packagecitydaysightseeing) this.updatedAt = packagecitydaysightseeing.updatedAt;
    this.packageCityDayId = packagecitydaysightseeing.packageCityDayId;
    this.sightseeingName = packagecitydaysightseeing.sightseeingName;
    this.ticket = packagecitydaysightseeing.ticket || undefined;
    this.timeFrom = packagecitydaysightseeing.timeFrom || undefined;
    this.timeTo = packagecitydaysightseeing.timeTo || undefined;
    this.packageCityDay = packagecitydaysightseeing.packageCityDay && typeof packagecitydaysightseeing.packageCityDay === 'object' ? new PackageCityDayResponse({ ...(packagecitydaysightseeing.packageCityDay as any) }) : undefined;
  }
}
