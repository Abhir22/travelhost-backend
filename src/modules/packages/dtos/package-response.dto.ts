import { PackageCategoryMappingResponse } from '@/modules/packages/dtos/packagecategorymapping-response.dto';
import { PackageActivityMappingResponse } from '@/modules/packages/dtos/packageactivitymapping-response.dto';
import { PackageSnapshotMappingResponse } from '@/modules/packages/dtos/packagesnapshotmapping-response.dto';
import { PackageTypeResponse } from '@/modules/packages/dtos/packagetype-response.dto';
import { PackageCityResponse } from '@/modules/packages/dtos/packagecity-response.dto';
import { Package } from '@/modules/packages/entities/package.entity';

export class PackageResponse {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  packageTypeId: string;
  packageName: string;
  description?: any;
  video?: string;
  basePrice?: string;
  days: number;
  nights: number;
  packagecategorymappings?: PackageCategoryMappingResponse[];
  packageactivitymappings?: PackageActivityMappingResponse[];
  packagesnapshotmappings?: PackageSnapshotMappingResponse[];
  packageType?: PackageTypeResponse;
  packagecities?: PackageCityResponse[];

  constructor(pkg: Package) {
    if ('id' in pkg) this.id = pkg.id;
    if ('createdAt' in pkg) this.createdAt = pkg.createdAt;
    if ('updatedAt' in pkg) this.updatedAt = pkg.updatedAt;
    this.packageTypeId = pkg.packageTypeId;
    this.packageName = pkg.packageName;
    this.description = pkg.description || undefined;
    this.video = pkg.video || undefined;
    this.basePrice = pkg.basePrice != null ? pkg.basePrice.toString() : undefined;
    this.days = pkg.days;
    this.nights = pkg.nights;
    this.packagecategorymappings = Array.isArray(pkg.packagecategorymappings) ? pkg.packagecategorymappings.map((r: any) => new PackageCategoryMappingResponse({ ...(r as any) })) : [];
    this.packageactivitymappings = Array.isArray(pkg.packageactivitymappings) ? pkg.packageactivitymappings.map((r: any) => new PackageActivityMappingResponse({ ...(r as any) })) : [];
    this.packagesnapshotmappings = Array.isArray(pkg.packagesnapshotmappings) ? pkg.packagesnapshotmappings.map((r: any) => new PackageSnapshotMappingResponse({ ...(r as any) })) : [];
    this.packageType = pkg.packageType && typeof pkg.packageType === 'object' ? new PackageTypeResponse({ ...(pkg.packageType as any) }) : undefined;
    this.packagecities = Array.isArray(pkg.packagecities) ? pkg.packagecities.map((r: any) => new PackageCityResponse({ ...(r as any) })) : [];
  }
}
