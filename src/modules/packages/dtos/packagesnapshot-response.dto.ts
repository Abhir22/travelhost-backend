import { PackageSnapshotMappingResponse } from '@/modules/packages/dtos/packagesnapshotmapping-response.dto';
import { PackageSnapshot } from '@/modules/packages/entities/packagesnapshot.entity';

export class PackageSnapshotResponse {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  icon?: string;
  packagesnapshotmappings?: PackageSnapshotMappingResponse[];

  constructor(packagesnapshot: PackageSnapshot) {
    if ('id' in packagesnapshot) this.id = packagesnapshot.id;
    if ('createdAt' in packagesnapshot) this.createdAt = packagesnapshot.createdAt;
    if ('updatedAt' in packagesnapshot) this.updatedAt = packagesnapshot.updatedAt;
    this.name = packagesnapshot.name;
    this.icon = packagesnapshot.icon || undefined;
    this.packagesnapshotmappings = Array.isArray(packagesnapshot.packagesnapshotmappings) ? packagesnapshot.packagesnapshotmappings.map((r: any) => new PackageSnapshotMappingResponse({ ...(r as any) })) : [];
  }
}
