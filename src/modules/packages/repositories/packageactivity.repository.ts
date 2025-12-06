import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { PackageActivity, PackageActivityCreateDto, PackageActivityUpdateDto } from '@/modules/packages/entities/packageactivity.entity';
import { IPackageActivityRepository } from '@/modules/packages/repositories/interfaces/packageactivity.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class PackageActivityRepository extends BaseRepository<PackageActivity, PackageActivityCreateDto, PackageActivityUpdateDto> implements IPackageActivityRepository {
  constructor() {
    super(prisma, 'PackageActivity');
  }

  // Add custom repository methods here

}
