import { IRepository } from '@/core/interfaces/repository.interface';
import { PackageSnapshotMapping, PackageSnapshotMappingCreateDto, PackageSnapshotMappingUpdateDto } from '@/modules/packages/entities/packagesnapshotmapping.entity';

export interface IPackageSnapshotMappingRepository extends IRepository<PackageSnapshotMapping, PackageSnapshotMappingCreateDto, PackageSnapshotMappingUpdateDto> {
  // Add custom repository methods here
}
