import moment from 'moment';
import { PackageSnapshotMappingResponse } from '@/modules/packages/dtos/packagesnapshotmapping-response.dto';
import { PackageSnapshot } from '@/modules/packages/entities/packagesnapshot.entity';

export class PackageSnapshotResponse {
  id?: string;
  name: string;
  icon?: string;
  // packagesnapshotmappings?: PackageSnapshotMappingResponse[];
  createdAt?: string;
  updatedAt?: string;

  constructor(packagesnapshot: PackageSnapshot) {
    if ('id' in packagesnapshot && packagesnapshot.id) this.id = packagesnapshot.id;
    this.name = packagesnapshot.name;
    this.icon = packagesnapshot.icon || undefined;
    // this.packagesnapshotmappings = Array.isArray(packagesnapshot.packagesnapshotmappings) ? packagesnapshot.packagesnapshotmappings.map((r: any) => new PackageSnapshotMappingResponse({ ...(r as any) })) : [];
    if ('createdAt' in packagesnapshot && packagesnapshot.createdAt) this.createdAt = moment(packagesnapshot.createdAt).format('DD-MM-YYYY');
    if ('updatedAt' in packagesnapshot && packagesnapshot.updatedAt) this.updatedAt = moment(packagesnapshot.updatedAt).format('DD-MM-YYYY');
  }
}
