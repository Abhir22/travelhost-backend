import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { PackageDayTravelType, PackageDayTravelTypeCreateDto, PackageDayTravelTypeUpdateDto } from '@/modules/package/entities/packagedaytraveltype.entity';
import { IPackageDayTravelTypeRepository } from '@/modules/package/repositories/interfaces/packagedaytraveltype.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class PackageDayTravelTypeRepository extends BaseRepository<PackageDayTravelType, PackageDayTravelTypeCreateDto, PackageDayTravelTypeUpdateDto> implements IPackageDayTravelTypeRepository {
  constructor() {
    super(prisma, 'PackageDayTravelType');
  }

  // Add custom repository methods here

}
