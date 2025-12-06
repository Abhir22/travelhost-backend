import { IService } from '@/core/interfaces/service.interface';
import { PackageSnapshotMapping, PackageSnapshotMappingCreateDto, PackageSnapshotMappingUpdateDto } from '@/modules/packages/entities/packagesnapshotmapping.entity';

export interface IPackageSnapshotMappingService extends IService<PackageSnapshotMapping, PackageSnapshotMappingCreateDto, PackageSnapshotMappingUpdateDto> {
  // Add custom service methods here
}
