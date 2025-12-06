import { IService } from '@/core/interfaces/service.interface';
import { PackageSnapshot, PackageSnapshotCreateDto, PackageSnapshotUpdateDto } from '@/modules/packages/entities/packagesnapshot.entity';

export interface IPackageSnapshotService extends IService<PackageSnapshot, PackageSnapshotCreateDto, PackageSnapshotUpdateDto> {
  // Add custom service methods here
}
