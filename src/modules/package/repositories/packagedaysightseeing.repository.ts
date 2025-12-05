import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { PackageDaySightseeing, PackageDaySightseeingCreateDto, PackageDaySightseeingUpdateDto } from '@/modules/package/entities/packagedaysightseeing.entity';
import { IPackageDaySightseeingRepository } from '@/modules/package/repositories/interfaces/packagedaysightseeing.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class PackageDaySightseeingRepository extends BaseRepository<PackageDaySightseeing, PackageDaySightseeingCreateDto, PackageDaySightseeingUpdateDto> implements IPackageDaySightseeingRepository {
  constructor() {
    super(prisma, 'PackageDaySightseeing');
  }

  // Add custom repository methods here

}
