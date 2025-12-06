import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { PackageCityDayHotel, PackageCityDayHotelCreateDto, PackageCityDayHotelUpdateDto } from '@/modules/packages/entities/packagecitydayhotel.entity';
import { IPackageCityDayHotelRepository } from '@/modules/packages/repositories/interfaces/packagecitydayhotel.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class PackageCityDayHotelRepository extends BaseRepository<PackageCityDayHotel, PackageCityDayHotelCreateDto, PackageCityDayHotelUpdateDto> implements IPackageCityDayHotelRepository {
  constructor() {
    super(prisma, 'PackageCityDayHotel');
  }

  // Add custom repository methods here

}
