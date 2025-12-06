import { IRepository } from '@/core/interfaces/repository.interface';
import { PackageSnapshot, PackageSnapshotCreateDto, PackageSnapshotUpdateDto } from '@/modules/packages/entities/packagesnapshot.entity';

export interface IPackageSnapshotRepository extends IRepository<PackageSnapshot, PackageSnapshotCreateDto, PackageSnapshotUpdateDto> {
  // Add custom repository methods here
}
