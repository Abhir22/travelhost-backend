import { PackageDayResponse } from '@/modules/package/dtos/packageday-response.dto';
import { PackageDaySightseeing } from '@/modules/package/entities/packagedaysightseeing.entity';

export class PackageDaySightseeingResponse {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  packageDayId: string;
  sightseeingName: string;
  ticket?: string;
  timeFrom?: string;
  timeTo?: string;
  packageDay?: PackageDayResponse;

  constructor(packagedaysightseeing: PackageDaySightseeing) {
    if ('id' in packagedaysightseeing) this.id = packagedaysightseeing.id;
    if ('createdAt' in packagedaysightseeing) this.createdAt = packagedaysightseeing.createdAt;
    if ('updatedAt' in packagedaysightseeing) this.updatedAt = packagedaysightseeing.updatedAt;
    this.packageDayId = packagedaysightseeing.packageDayId;
    this.sightseeingName = packagedaysightseeing.sightseeingName;
    this.ticket = packagedaysightseeing.ticket || undefined;
    this.timeFrom = packagedaysightseeing.timeFrom || undefined;
    this.timeTo = packagedaysightseeing.timeTo || undefined;
    this.packageDay = packagedaysightseeing.packageDay && typeof packagedaysightseeing.packageDay === 'object' ? new PackageDayResponse({ ...(packagedaysightseeing.packageDay as any) }) : undefined;
  }
}
