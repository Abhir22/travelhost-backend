import { PackageCityResponse } from '@/modules/packages/dtos/packagecity-response.dto';
import { PackageCityDayTravelResponse } from '@/modules/packages/dtos/packagecitydaytravel-response.dto';
import { PackageCityDaySightseeingResponse } from '@/modules/packages/dtos/packagecitydaysightseeing-response.dto';
import { PackageCityDayHotelResponse } from '@/modules/packages/dtos/packagecitydayhotel-response.dto';
import { PackageCityDayMealResponse } from '@/modules/packages/dtos/packagecitydaymeal-response.dto';
import { PackageCityDay } from '@/modules/packages/entities/packagecityday.entity';

export class PackageCityDayResponse {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  packageCityId: string;
  dayNumber: number;
  startTime?: string;
  endTime?: string;
  startFrom?: string;
  endAt?: string;
  description?: any;
  packageCity?: PackageCityResponse;
  packagecitydaytravels?: PackageCityDayTravelResponse[];
  packagecitydaysightseeings?: PackageCityDaySightseeingResponse[];
  packagecitydayhotels?: PackageCityDayHotelResponse[];
  packagecitydaymeals?: PackageCityDayMealResponse[];

  constructor(packagecityday: PackageCityDay) {
    if ('id' in packagecityday) this.id = packagecityday.id;
    if ('createdAt' in packagecityday) this.createdAt = packagecityday.createdAt;
    if ('updatedAt' in packagecityday) this.updatedAt = packagecityday.updatedAt;
    this.packageCityId = packagecityday.packageCityId;
    this.dayNumber = packagecityday.dayNumber;
    this.startTime = packagecityday.startTime || undefined;
    this.endTime = packagecityday.endTime || undefined;
    this.startFrom = packagecityday.startFrom || undefined;
    this.endAt = packagecityday.endAt || undefined;
    this.description = packagecityday.description || undefined;
    this.packageCity = packagecityday.packageCity && typeof packagecityday.packageCity === 'object' ? new PackageCityResponse({ ...(packagecityday.packageCity as any) }) : undefined;
    this.packagecitydaytravels = Array.isArray(packagecityday.packagecitydaytravels) ? packagecityday.packagecitydaytravels.map((r: any) => new PackageCityDayTravelResponse({ ...(r as any) })) : [];
    this.packagecitydaysightseeings = Array.isArray(packagecityday.packagecitydaysightseeings) ? packagecityday.packagecitydaysightseeings.map((r: any) => new PackageCityDaySightseeingResponse({ ...(r as any) })) : [];
    this.packagecitydayhotels = Array.isArray(packagecityday.packagecitydayhotels) ? packagecityday.packagecitydayhotels.map((r: any) => new PackageCityDayHotelResponse({ ...(r as any) })) : [];
    this.packagecitydaymeals = Array.isArray(packagecityday.packagecitydaymeals) ? packagecityday.packagecitydaymeals.map((r: any) => new PackageCityDayMealResponse({ ...(r as any) })) : [];
  }
}
