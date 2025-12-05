import { PackageResponse } from '@/modules/package/dtos/package-response.dto';
import { PackageDayTravelTypeResponse } from '@/modules/package/dtos/packagedaytraveltype-response.dto';
import { PackageDaySightseeingResponse } from '@/modules/package/dtos/packagedaysightseeing-response.dto';
import { PackageDayHotelResponse } from '@/modules/package/dtos/packagedayhotel-response.dto';
import { PackageDay } from '@/modules/package/entities/packageday.entity';

export class PackageDayResponse {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  packageId: string;
  dayNumber: number;
  package?: PackageResponse;
  packagedaytraveltypes?: PackageDayTravelTypeResponse[];
  packagedaysightseeings?: PackageDaySightseeingResponse[];
  packagedayhotels?: PackageDayHotelResponse[];

  constructor(packageday: PackageDay) {
    if ('id' in packageday) this.id = packageday.id;
    if ('createdAt' in packageday) this.createdAt = packageday.createdAt;
    if ('updatedAt' in packageday) this.updatedAt = packageday.updatedAt;
    this.packageId = packageday.packageId;
    this.dayNumber = packageday.dayNumber;
    this.package = packageday.package && typeof packageday.package === 'object' ? new PackageResponse({ ...(packageday.package as any) }) : undefined;
    this.packagedaytraveltypes = Array.isArray(packageday.packagedaytraveltypes) ? packageday.packagedaytraveltypes.map((r: any) => new PackageDayTravelTypeResponse({ ...(r as any) })) : [];
    this.packagedaysightseeings = Array.isArray(packageday.packagedaysightseeings) ? packageday.packagedaysightseeings.map((r: any) => new PackageDaySightseeingResponse({ ...(r as any) })) : [];
    this.packagedayhotels = Array.isArray(packageday.packagedayhotels) ? packageday.packagedayhotels.map((r: any) => new PackageDayHotelResponse({ ...(r as any) })) : [];
  }
}
