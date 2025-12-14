import moment from 'moment';
import { PackageCityDayResponse } from '@/modules/packages/dtos/packagecityday-response.dto';
import { PackageCityDaySightseeing } from '@/modules/packages/entities/packagecitydaysightseeing.entity';

export class PackageCityDaySightseeingResponse {
  id?: string;
  packageCityDayId: string;
  sightseeingName: string;
  ticket?: string;
  timeFrom?: string;
  timeTo?: string;
  packageCityDay?: PackageCityDayResponse;
  createdAt?: string;
  updatedAt?: string;

  constructor(packagecitydaysightseeing: PackageCityDaySightseeing) {
    if ('id' in packagecitydaysightseeing && packagecitydaysightseeing.id) this.id = packagecitydaysightseeing.id;
    this.packageCityDayId = packagecitydaysightseeing.packageCityDayId;
    this.sightseeingName = packagecitydaysightseeing.sightseeingName;
    this.ticket = packagecitydaysightseeing.ticket || undefined;
    this.timeFrom = packagecitydaysightseeing.timeFrom || undefined;
    this.timeTo = packagecitydaysightseeing.timeTo || undefined;
    this.packageCityDay = packagecitydaysightseeing.packageCityDay && typeof packagecitydaysightseeing.packageCityDay === 'object' ? new PackageCityDayResponse({ ...(packagecitydaysightseeing.packageCityDay as any) }) : undefined;
    if ('createdAt' in packagecitydaysightseeing && packagecitydaysightseeing.createdAt) this.createdAt = moment(packagecitydaysightseeing.createdAt).format('DD-MM-YYYY');
    if ('updatedAt' in packagecitydaysightseeing && packagecitydaysightseeing.updatedAt) this.updatedAt = moment(packagecitydaysightseeing.updatedAt).format('DD-MM-YYYY');
  }
}
