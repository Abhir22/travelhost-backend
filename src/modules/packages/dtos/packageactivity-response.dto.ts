import { PackageActivityMappingResponse } from '@/modules/packages/dtos/packageactivitymapping-response.dto';
import { PackageActivity } from '@/modules/packages/entities/packageactivity.entity';

export class PackageActivityResponse {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  image?: string;
  packageactivitymappings?: PackageActivityMappingResponse[];

  constructor(packageactivity: PackageActivity) {
    if ('id' in packageactivity) this.id = packageactivity.id;
    if ('createdAt' in packageactivity) this.createdAt = packageactivity.createdAt;
    if ('updatedAt' in packageactivity) this.updatedAt = packageactivity.updatedAt;
    this.name = packageactivity.name;
    this.image = packageactivity.image || undefined;
    this.packageactivitymappings = Array.isArray(packageactivity.packageactivitymappings) ? packageactivity.packageactivitymappings.map((r: any) => new PackageActivityMappingResponse({ ...(r as any) })) : [];
  }
}
