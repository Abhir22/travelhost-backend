import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { PackageActivityMapping, PackageActivityMappingCreateDto, PackageActivityMappingUpdateDto } from '@/modules/packages/entities/packageactivitymapping.entity';
import { IPackageActivityMappingRepository } from '@/modules/packages/repositories/interfaces/packageactivitymapping.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class PackageActivityMappingRepository extends BaseRepository<PackageActivityMapping, PackageActivityMappingCreateDto, PackageActivityMappingUpdateDto> implements IPackageActivityMappingRepository {
  constructor() {
    super(prisma, 'PackageActivityMapping');
  }

  // Add custom repository methods here

}
