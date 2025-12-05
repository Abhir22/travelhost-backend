import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { PackageDayHotel, PackageDayHotelCreateDto, PackageDayHotelUpdateDto } from '@/modules/package/entities/packagedayhotel.entity';
import { IPackageDayHotelRepository } from '@/modules/package/repositories/interfaces/packagedayhotel.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class PackageDayHotelRepository extends BaseRepository<PackageDayHotel, PackageDayHotelCreateDto, PackageDayHotelUpdateDto> implements IPackageDayHotelRepository {
  constructor() {
    super(prisma, 'PackageDayHotel');
  }

  // Add custom repository methods here

}
