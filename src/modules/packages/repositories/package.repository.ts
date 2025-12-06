import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { Package, PackageCreateDto, PackageUpdateDto } from '@/modules/packages/entities/package.entity';
import { IPackageRepository } from '@/modules/packages/repositories/interfaces/package.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class PackageRepository extends BaseRepository<Package, PackageCreateDto, PackageUpdateDto> implements IPackageRepository {
  constructor() {
    super(prisma, 'Package');
  }

  // Add custom repository methods here

}
