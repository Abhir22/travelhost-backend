import { IRepository } from '@/core/interfaces/repository.interface';
import { PackageType, PackageTypeCreateDto, PackageTypeUpdateDto } from '@/modules/package/entities/packagetype.entity';

export interface IPackageTypeRepository extends IRepository<PackageType, PackageTypeCreateDto, PackageTypeUpdateDto> {
  // Add custom repository methods here
}
