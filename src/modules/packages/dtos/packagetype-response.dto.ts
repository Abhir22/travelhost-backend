import { PackageResponse } from '@/modules/packages/dtos/package-response.dto';
import { PackageType } from '@/modules/packages/entities/packagetype.entity';

export class PackageTypeResponse {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  image?: string;
  isInternational: boolean;
  packages?: PackageResponse[];

  constructor(packagetype: PackageType) {
    if ('id' in packagetype) this.id = packagetype.id;
    if ('createdAt' in packagetype) this.createdAt = packagetype.createdAt;
    if ('updatedAt' in packagetype) this.updatedAt = packagetype.updatedAt;
    this.name = packagetype.name;
    this.image = packagetype.image || undefined;
    this.isInternational = packagetype.isInternational;
    this.packages = Array.isArray(packagetype.packages) ? packagetype.packages.map((r: any) => new PackageResponse({ ...(r as any) })) : [];
  }
}
