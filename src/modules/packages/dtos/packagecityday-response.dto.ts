import moment from 'moment';
import { PackageCityResponse } from '@/modules/packages/dtos/packagecity-response.dto';
import { PackageCityDayTravelResponse } from '@/modules/packages/dtos/packagecitydaytravel-response.dto';
import { PackageCityDaySightseeingResponse } from '@/modules/packages/dtos/packagecitydaysightseeing-response.dto';
import { PackageCityDayHotelResponse } from '@/modules/packages/dtos/packagecitydayhotel-response.dto';
import { PackageCityDayMealResponse } from '@/modules/packages/dtos/packagecitydaymeal-response.dto';
import { PackageCityDay } from '@/modules/packages/entities/packagecityday.entity';

export class PackageCityDayResponse {
  id?: string;
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
  createdAt?: string;
  updatedAt?: string;

  constructor(packagecityday: PackageCityDay) {
    if ('id' in packagecityday && packagecityday.id) this.id = packagecityday.id;
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
    if ('createdAt' in packagecityday && packagecityday.createdAt) this.createdAt = moment(packagecityday.createdAt).format('DD-MM-YYYY');
    if ('updatedAt' in packagecityday && packagecityday.updatedAt) this.updatedAt = moment(packagecityday.updatedAt).format('DD-MM-YYYY');
  }
}
