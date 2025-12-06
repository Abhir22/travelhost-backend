import { PackageResponse } from '@/modules/packages/dtos/package-response.dto';
import { PackageActivityResponse } from '@/modules/packages/dtos/packageactivity-response.dto';
import { PackageActivityMapping } from '@/modules/packages/entities/packageactivitymapping.entity';

export class PackageActivityMappingResponse {
  id?: string;
  packageId: string;
  activityId: string;
  package?: PackageResponse;
  activity?: PackageActivityResponse;

  constructor(packageactivitymapping: PackageActivityMapping) {
    if ('id' in packageactivitymapping) this.id = packageactivitymapping.id;
    this.packageId = packageactivitymapping.packageId;
    this.activityId = packageactivitymapping.activityId;
    this.package = packageactivitymapping.package && typeof packageactivitymapping.package === 'object' ? new PackageResponse({ ...(packageactivitymapping.package as any) }) : undefined;
    this.activity = packageactivitymapping.activity && typeof packageactivitymapping.activity === 'object' ? new PackageActivityResponse({ ...(packageactivitymapping.activity as any) }) : undefined;
  }
}
