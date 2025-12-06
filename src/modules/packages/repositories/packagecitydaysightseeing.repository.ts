import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { PackageCityDaySightseeing, PackageCityDaySightseeingCreateDto, PackageCityDaySightseeingUpdateDto } from '@/modules/packages/entities/packagecitydaysightseeing.entity';
import { IPackageCityDaySightseeingRepository } from '@/modules/packages/repositories/interfaces/packagecitydaysightseeing.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class PackageCityDaySightseeingRepository extends BaseRepository<PackageCityDaySightseeing, PackageCityDaySightseeingCreateDto, PackageCityDaySightseeingUpdateDto> implements IPackageCityDaySightseeingRepository {
  constructor() {
    super(prisma, 'PackageCityDaySightseeing');
  }

  // Add custom repository methods here

}
