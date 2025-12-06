import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { PackageCategory, PackageCategoryCreateDto, PackageCategoryUpdateDto } from '@/modules/packages/entities/packagecategory.entity';
import { IPackageCategoryRepository } from '@/modules/packages/repositories/interfaces/packagecategory.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class PackageCategoryRepository extends BaseRepository<PackageCategory, PackageCategoryCreateDto, PackageCategoryUpdateDto> implements IPackageCategoryRepository {
  constructor() {
    super(prisma, 'PackageCategory');
  }

  // Add custom repository methods here

}
