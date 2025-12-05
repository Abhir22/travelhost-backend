import { PackageTypeResponse } from '@/modules/package/dtos/packagetype-response.dto';
import { PackageDayResponse } from '@/modules/package/dtos/packageday-response.dto';
import { Package } from '@/modules/package/entities/package.entity';

export class PackageResponse {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  packageTypeId: string;
  packageName: string;
  countryId?: string;
  stateId?: string;
  cityId?: string;
  days: number;
  nights: number;
  packageType?: PackageTypeResponse;
  packagedaies?: PackageDayResponse[];

  constructor(pkg: Package) {
    if ('id' in pkg) this.id = pkg.id;
    if ('createdAt' in pkg) this.createdAt = pkg.createdAt;
    if ('updatedAt' in pkg) this.updatedAt = pkg.updatedAt;
    this.packageTypeId = pkg.packageTypeId;
    this.packageName = pkg.packageName;
    this.countryId = pkg.countryId || undefined;
    this.stateId = pkg.stateId || undefined;
    this.cityId = pkg.cityId || undefined;
    this.days = pkg.days;
    this.nights = pkg.nights;
    this.packageType = pkg.packageType && typeof pkg.packageType === 'object' ? new PackageTypeResponse({ ...(pkg.packageType as any) }) : undefined;
    this.packagedaies = Array.isArray(pkg.packagedaies) ? pkg.packagedaies.map((r: any) => new PackageDayResponse({ ...(r as any) })) : [];
  }
}
