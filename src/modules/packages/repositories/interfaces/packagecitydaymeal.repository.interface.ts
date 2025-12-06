import { IRepository } from '@/core/interfaces/repository.interface';
import { PackageCityDayMeal, PackageCityDayMealCreateDto, PackageCityDayMealUpdateDto } from '@/modules/packages/entities/packagecitydaymeal.entity';

export interface IPackageCityDayMealRepository extends IRepository<PackageCityDayMeal, PackageCityDayMealCreateDto, PackageCityDayMealUpdateDto> {
  // Add custom repository methods here
}
