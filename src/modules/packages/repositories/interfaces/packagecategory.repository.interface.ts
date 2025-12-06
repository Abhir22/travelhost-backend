import { IRepository } from '@/core/interfaces/repository.interface';
import { PackageCategory, PackageCategoryCreateDto, PackageCategoryUpdateDto } from '@/modules/packages/entities/packagecategory.entity';

export interface IPackageCategoryRepository extends IRepository<PackageCategory, PackageCategoryCreateDto, PackageCategoryUpdateDto> {
  // Add custom repository methods here
}
