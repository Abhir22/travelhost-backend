import { IService } from '@/core/interfaces/service.interface';
import { PackageCategory, PackageCategoryCreateDto, PackageCategoryUpdateDto } from '@/modules/packages/entities/packagecategory.entity';

export interface IPackageCategoryService extends IService<PackageCategory, PackageCategoryCreateDto, PackageCategoryUpdateDto> {
  // Add custom service methods here
}
