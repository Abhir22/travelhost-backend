import { IRepository } from '@/core/interfaces/repository.interface';
import { PackageActivity, PackageActivityCreateDto, PackageActivityUpdateDto } from '@/modules/packages/entities/packageactivity.entity';

export interface IPackageActivityRepository extends IRepository<PackageActivity, PackageActivityCreateDto, PackageActivityUpdateDto> {
  // Add custom repository methods here
}
