import moment from 'moment';
import { PackageActivityMappingResponse } from '@/modules/packages/dtos/packageactivitymapping-response.dto';
import { PackageActivity } from '@/modules/packages/entities/packageactivity.entity';

export class PackageActivityResponse {
  id?: string;
  name: string;
  image?: string;
  // packageactivitymappings?: PackageActivityMappingResponse[];
  createdAt?: string;
  updatedAt?: string;

  constructor(packageactivity: PackageActivity) {
    if ('id' in packageactivity && packageactivity.id) this.id = packageactivity.id;
    this.name = packageactivity.name;
    this.image = packageactivity.image || undefined;
    // this.packageactivitymappings = Array.isArray(packageactivity.packageactivitymappings) ? packageactivity.packageactivitymappings.map((r: any) => new PackageActivityMappingResponse({ ...(r as any) })) : [];
    if ('createdAt' in packageactivity && packageactivity.createdAt) this.createdAt = moment(packageactivity.createdAt).format('DD-MM-YYYY');
    if ('updatedAt' in packageactivity && packageactivity.updatedAt) this.updatedAt = moment(packageactivity.updatedAt).format('DD-MM-YYYY');
  }
}
