import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { PackageCity, PackageCityCreateDto, PackageCityUpdateDto } from '@/modules/packages/entities/packagecity.entity';
import { IPackageCityRepository } from '@/modules/packages/repositories/interfaces/packagecity.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class PackageCityRepository extends BaseRepository<PackageCity, PackageCityCreateDto, PackageCityUpdateDto> implements IPackageCityRepository {
  constructor() {
    super(prisma, 'PackageCity');
  }

  // Add custom repository methods here

}
