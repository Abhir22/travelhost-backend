import { IRepository } from '@/core/interfaces/repository.interface';
import { PackageCityDaySightseeing, PackageCityDaySightseeingCreateDto, PackageCityDaySightseeingUpdateDto } from '@/modules/packages/entities/packagecitydaysightseeing.entity';

export interface IPackageCityDaySightseeingRepository extends IRepository<PackageCityDaySightseeing, PackageCityDaySightseeingCreateDto, PackageCityDaySightseeingUpdateDto> {
  // Add custom repository methods here
}
