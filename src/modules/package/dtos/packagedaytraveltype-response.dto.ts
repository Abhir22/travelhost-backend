import { PackageDayResponse } from '@/modules/package/dtos/packageday-response.dto';
import { PackageDayTravelType } from '@/modules/package/entities/packagedaytraveltype.entity';

export class PackageDayTravelTypeResponse {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  packageDayId: string;
  type: string;
  carpooling?: string;
  vehicleType?: string;
  timeFrom?: string;
  timeTo?: string;
  description?: any;
  packageDay?: PackageDayResponse;

  constructor(packagedaytraveltype: PackageDayTravelType) {
    if ('id' in packagedaytraveltype) this.id = packagedaytraveltype.id;
    if ('createdAt' in packagedaytraveltype) this.createdAt = packagedaytraveltype.createdAt;
    if ('updatedAt' in packagedaytraveltype) this.updatedAt = packagedaytraveltype.updatedAt;
    this.packageDayId = packagedaytraveltype.packageDayId;
    this.type = packagedaytraveltype.type;
    this.carpooling = packagedaytraveltype.carpooling || undefined;
    this.vehicleType = packagedaytraveltype.vehicleType || undefined;
    this.timeFrom = packagedaytraveltype.timeFrom || undefined;
    this.timeTo = packagedaytraveltype.timeTo || undefined;
    this.description = packagedaytraveltype.description || undefined;
    this.packageDay = packagedaytraveltype.packageDay && typeof packagedaytraveltype.packageDay === 'object' ? new PackageDayResponse({ ...(packagedaytraveltype.packageDay as any) }) : undefined;
  }
}
