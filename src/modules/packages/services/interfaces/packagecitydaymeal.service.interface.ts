import { IService } from '@/core/interfaces/service.interface';
import { PackageCityDayMeal, PackageCityDayMealCreateDto, PackageCityDayMealUpdateDto } from '@/modules/packages/entities/packagecitydaymeal.entity';

export interface IPackageCityDayMealService extends IService<PackageCityDayMeal, PackageCityDayMealCreateDto, PackageCityDayMealUpdateDto> {
  // Add custom service methods here
}
