import { IRepository } from '@/core/interfaces/repository.interface';
import { PackageDaySightseeing, PackageDaySightseeingCreateDto, PackageDaySightseeingUpdateDto } from '@/modules/package/entities/packagedaysightseeing.entity';

export interface IPackageDaySightseeingRepository extends IRepository<PackageDaySightseeing, PackageDaySightseeingCreateDto, PackageDaySightseeingUpdateDto> {
  // Add custom repository methods here
}
