import moment from 'moment';
import { PackageResponse } from '@/modules/packages/dtos/package-response.dto';
import { PackageType } from '@/modules/packages/entities/packagetype.entity';

export class PackageTypeResponse {
  id?: string;
  name: string;
  image?: string;
  isInternational: boolean;
  packages?: PackageResponse[];
  createdAt?: string;
  updatedAt?: string;

  constructor(packagetype: PackageType) {
    if ('id' in packagetype && packagetype.id) this.id = packagetype.id;
    this.name = packagetype.name;
    this.image = packagetype.image || undefined;
    this.isInternational = packagetype.isInternational;
    this.packages = Array.isArray(packagetype.packages) ? packagetype.packages.map((r: any) => new PackageResponse({ ...(r as any) })) : [];
    if ('createdAt' in packagetype && packagetype.createdAt) this.createdAt = moment(packagetype.createdAt).format('YYYY-MM-DD');
    if ('updatedAt' in packagetype && packagetype.updatedAt) this.updatedAt = moment(packagetype.updatedAt).format('YYYY-MM-DD');
  }
}
