import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { PackageSnapshot, PackageSnapshotCreateDto, PackageSnapshotUpdateDto } from '@/modules/packages/entities/packagesnapshot.entity';
import { IPackageSnapshotRepository } from '@/modules/packages/repositories/interfaces/packagesnapshot.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class PackageSnapshotRepository extends BaseRepository<PackageSnapshot, PackageSnapshotCreateDto, PackageSnapshotUpdateDto> implements IPackageSnapshotRepository {
  constructor() {
    super(prisma, 'PackageSnapshot');
  }

  // Add custom repository methods here

}
