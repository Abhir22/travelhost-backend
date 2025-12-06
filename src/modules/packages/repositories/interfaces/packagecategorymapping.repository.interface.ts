import { IRepository } from '@/core/interfaces/repository.interface';
import { PackageCategoryMapping, PackageCategoryMappingCreateDto, PackageCategoryMappingUpdateDto } from '@/modules/packages/entities/packagecategorymapping.entity';

export interface IPackageCategoryMappingRepository extends IRepository<PackageCategoryMapping, PackageCategoryMappingCreateDto, PackageCategoryMappingUpdateDto> {
  // Add custom repository methods here
}
