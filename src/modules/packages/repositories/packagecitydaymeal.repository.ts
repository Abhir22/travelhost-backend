import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { PackageCityDayMeal, PackageCityDayMealCreateDto, PackageCityDayMealUpdateDto } from '@/modules/packages/entities/packagecitydaymeal.entity';
import { IPackageCityDayMealRepository } from '@/modules/packages/repositories/interfaces/packagecitydaymeal.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class PackageCityDayMealRepository extends BaseRepository<PackageCityDayMeal, PackageCityDayMealCreateDto, PackageCityDayMealUpdateDto> implements IPackageCityDayMealRepository {
  constructor() {
    super(prisma, 'PackageCityDayMeal');
  }

  // Add custom repository methods here

}
