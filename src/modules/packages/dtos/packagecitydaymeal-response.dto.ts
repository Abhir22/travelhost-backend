import moment from 'moment';
import { PackageCityDayResponse } from '@/modules/packages/dtos/packagecityday-response.dto';
import { PackageCityDayMeal } from '@/modules/packages/entities/packagecitydaymeal.entity';

export class PackageCityDayMealResponse {
  id?: string;
  packageCityDayId: string;
  mealType: string;
  provider: string;
  time?: string;
  description?: any;
  packageCityDay?: PackageCityDayResponse;
  createdAt?: string;
  updatedAt?: string;

  constructor(packagecitydaymeal: PackageCityDayMeal) {
    if ('id' in packagecitydaymeal && packagecitydaymeal.id) this.id = packagecitydaymeal.id;
    this.packageCityDayId = packagecitydaymeal.packageCityDayId;
    this.mealType = packagecitydaymeal.mealType;
    this.provider = packagecitydaymeal.provider;
    this.time = packagecitydaymeal.time || undefined;
    this.description = packagecitydaymeal.description || undefined;
    this.packageCityDay = packagecitydaymeal.packageCityDay && typeof packagecitydaymeal.packageCityDay === 'object' ? new PackageCityDayResponse({ ...(packagecitydaymeal.packageCityDay as any) }) : undefined;
    if ('createdAt' in packagecitydaymeal && packagecitydaymeal.createdAt) this.createdAt = moment(packagecitydaymeal.createdAt).format('YYYY-MM-DD');
    if ('updatedAt' in packagecitydaymeal && packagecitydaymeal.updatedAt) this.updatedAt = moment(packagecitydaymeal.updatedAt).format('YYYY-MM-DD');
  }
}
