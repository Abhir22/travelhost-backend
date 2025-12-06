import { IRepository } from '@/core/interfaces/repository.interface';
import { Package, PackageCreateDto, PackageUpdateDto } from '@/modules/packages/entities/package.entity';

export interface IPackageRepository extends IRepository<Package, PackageCreateDto, PackageUpdateDto> {
  // Add custom repository methods here
}
