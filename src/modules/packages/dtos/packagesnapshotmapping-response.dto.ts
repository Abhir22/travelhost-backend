import { PackageResponse } from '@/modules/packages/dtos/package-response.dto';
import { PackageSnapshotResponse } from '@/modules/packages/dtos/packagesnapshot-response.dto';
import { PackageSnapshotMapping } from '@/modules/packages/entities/packagesnapshotmapping.entity';

export class PackageSnapshotMappingResponse {
  id?: string;
  packageId: string;
  snapshotId: string;
  package?: PackageResponse;
  snapshot?: PackageSnapshotResponse;

  constructor(packagesnapshotmapping: PackageSnapshotMapping) {
    if ('id' in packagesnapshotmapping) this.id = packagesnapshotmapping.id;
    this.packageId = packagesnapshotmapping.packageId;
    this.snapshotId = packagesnapshotmapping.snapshotId;
    this.package = packagesnapshotmapping.package && typeof packagesnapshotmapping.package === 'object' ? new PackageResponse({ ...(packagesnapshotmapping.package as any) }) : undefined;
    this.snapshot = packagesnapshotmapping.snapshot && typeof packagesnapshotmapping.snapshot === 'object' ? new PackageSnapshotResponse({ ...(packagesnapshotmapping.snapshot as any) }) : undefined;
  }
}
