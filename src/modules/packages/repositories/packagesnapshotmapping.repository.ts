import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { PackageSnapshotMapping, PackageSnapshotMappingCreateDto, PackageSnapshotMappingUpdateDto } from '@/modules/packages/entities/packagesnapshotmapping.entity';
import { IPackageSnapshotMappingRepository } from '@/modules/packages/repositories/interfaces/packagesnapshotmapping.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class PackageSnapshotMappingRepository extends BaseRepository<PackageSnapshotMapping, PackageSnapshotMappingCreateDto, PackageSnapshotMappingUpdateDto> implements IPackageSnapshotMappingRepository {
  constructor() {
    super(prisma, 'PackageSnapshotMapping');
  }

  // Add custom repository methods here

}
