import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { PackageCityDay, PackageCityDayCreateDto, PackageCityDayUpdateDto } from '@/modules/packages/entities/packagecityday.entity';
import { IPackageCityDayRepository } from '@/modules/packages/repositories/interfaces/packagecityday.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class PackageCityDayRepository extends BaseRepository<PackageCityDay, PackageCityDayCreateDto, PackageCityDayUpdateDto> implements IPackageCityDayRepository {
  constructor() {
    super(prisma, 'PackageCityDay');
  }

  // Add custom repository methods here

}
