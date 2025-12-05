import { PackageResponse } from '@/modules/package/dtos/package-response.dto';
import { PackageType } from '@/modules/package/entities/packagetype.entity';

export class PackageTypeResponse {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  image?: string;
  packages?: PackageResponse[];

  constructor(packagetype: PackageType) {
    if ('id' in packagetype) this.id = packagetype.id;
    if ('createdAt' in packagetype) this.createdAt = packagetype.createdAt;
    if ('updatedAt' in packagetype) this.updatedAt = packagetype.updatedAt;
    this.name = packagetype.name;
    this.image = packagetype.image || undefined;
    this.packages = Array.isArray(packagetype.packages) ? packagetype.packages.map((r: any) => new PackageResponse({ ...(r as any) })) : [];
  }
}
