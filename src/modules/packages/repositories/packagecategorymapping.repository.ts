import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { PackageCategoryMapping, PackageCategoryMappingCreateDto, PackageCategoryMappingUpdateDto } from '@/modules/packages/entities/packagecategorymapping.entity';
import { IPackageCategoryMappingRepository } from '@/modules/packages/repositories/interfaces/packagecategorymapping.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class PackageCategoryMappingRepository extends BaseRepository<PackageCategoryMapping, PackageCategoryMappingCreateDto, PackageCategoryMappingUpdateDto> implements IPackageCategoryMappingRepository {
  constructor() {
    super(prisma, 'PackageCategoryMapping');
  }

  // Add custom repository methods here

}
