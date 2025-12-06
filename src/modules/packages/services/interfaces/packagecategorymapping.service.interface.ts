import { IService } from '@/core/interfaces/service.interface';
import { PackageCategoryMapping, PackageCategoryMappingCreateDto, PackageCategoryMappingUpdateDto } from '@/modules/packages/entities/packagecategorymapping.entity';

export interface IPackageCategoryMappingService extends IService<PackageCategoryMapping, PackageCategoryMappingCreateDto, PackageCategoryMappingUpdateDto> {
  // Add custom service methods here
}
