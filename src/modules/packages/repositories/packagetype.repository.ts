import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { PackageType, PackageTypeCreateDto, PackageTypeUpdateDto } from '@/modules/packages/entities/packagetype.entity';
import { IPackageTypeRepository } from '@/modules/packages/repositories/interfaces/packagetype.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class PackageTypeRepository extends BaseRepository<PackageType, PackageTypeCreateDto, PackageTypeUpdateDto> implements IPackageTypeRepository {
  constructor() {
    super(prisma, 'PackageType');
  }

  // Add custom repository methods here

}
