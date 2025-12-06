import { IRepository } from '@/core/interfaces/repository.interface';
import { PackageActivityMapping, PackageActivityMappingCreateDto, PackageActivityMappingUpdateDto } from '@/modules/packages/entities/packageactivitymapping.entity';

export interface IPackageActivityMappingRepository extends IRepository<PackageActivityMapping, PackageActivityMappingCreateDto, PackageActivityMappingUpdateDto> {
  // Add custom repository methods here
}
