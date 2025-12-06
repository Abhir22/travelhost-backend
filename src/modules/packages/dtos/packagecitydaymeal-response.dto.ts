import { PackageCityDayResponse } from '@/modules/packages/dtos/packagecityday-response.dto';
import { PackageCityDayMeal } from '@/modules/packages/entities/packagecitydaymeal.entity';

export class PackageCityDayMealResponse {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  packageCityDayId: string;
  mealType: string;
  provider: string;
  time?: string;
  description?: any;
  packageCityDay?: PackageCityDayResponse;

  constructor(packagecitydaymeal: PackageCityDayMeal) {
    if ('id' in packagecitydaymeal) this.id = packagecitydaymeal.id;
    if ('createdAt' in packagecitydaymeal) this.createdAt = packagecitydaymeal.createdAt;
    if ('updatedAt' in packagecitydaymeal) this.updatedAt = packagecitydaymeal.updatedAt;
    this.packageCityDayId = packagecitydaymeal.packageCityDayId;
    this.mealType = packagecitydaymeal.mealType;
    this.provider = packagecitydaymeal.provider;
    this.time = packagecitydaymeal.time || undefined;
    this.description = packagecitydaymeal.description || undefined;
    this.packageCityDay = packagecitydaymeal.packageCityDay && typeof packagecitydaymeal.packageCityDay === 'object' ? new PackageCityDayResponse({ ...(packagecitydaymeal.packageCityDay as any) }) : undefined;
  }
}
