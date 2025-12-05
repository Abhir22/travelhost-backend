import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { PackageDay, PackageDayCreateDto, PackageDayUpdateDto } from '@/modules/package/entities/packageday.entity';
import { IPackageDayRepository } from '@/modules/package/repositories/interfaces/packageday.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class PackageDayRepository extends BaseRepository<PackageDay, PackageDayCreateDto, PackageDayUpdateDto> implements IPackageDayRepository {
  constructor() {
    super(prisma, 'PackageDay');
  }

  // Add custom repository methods here

}
