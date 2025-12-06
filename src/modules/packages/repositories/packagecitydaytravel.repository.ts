import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { PackageCityDayTravel, PackageCityDayTravelCreateDto, PackageCityDayTravelUpdateDto } from '@/modules/packages/entities/packagecitydaytravel.entity';
import { IPackageCityDayTravelRepository } from '@/modules/packages/repositories/interfaces/packagecitydaytravel.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class PackageCityDayTravelRepository extends BaseRepository<PackageCityDayTravel, PackageCityDayTravelCreateDto, PackageCityDayTravelUpdateDto> implements IPackageCityDayTravelRepository {
  constructor() {
    super(prisma, 'PackageCityDayTravel');
  }

  // Add custom repository methods here

}
