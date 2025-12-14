import moment from 'moment';
import { PackageCategoryMappingResponse } from '@/modules/packages/dtos/packagecategorymapping-response.dto';
import { PackageActivityMappingResponse } from '@/modules/packages/dtos/packageactivitymapping-response.dto';
import { PackageSnapshotMappingResponse } from '@/modules/packages/dtos/packagesnapshotmapping-response.dto';
import { PackageTypeResponse } from '@/modules/packages/dtos/packagetype-response.dto';
import { PackageCityResponse } from '@/modules/packages/dtos/packagecity-response.dto';

import { Package } from '@/modules/packages/entities/package.entity';

export class PackageResponse {
  id?: string;
  packageTypeId: string;
  packageName: string;
  shortDescription?: string;
  longDescription?: string;
  description?: any;
  mainImage?: string;
  thumbnail?: string;
  video?: string;
  basePrice?: string;
  days: number;
  nights: number;
  packagecategorymappings?: PackageCategoryMappingResponse[];
  packageactivitymappings?: PackageActivityMappingResponse[];
  packagesnapshotmappings?: PackageSnapshotMappingResponse[];
  packageType?: PackageTypeResponse;
  packagecities?: PackageCityResponse[];
  createdAt?: string;
  updatedAt?: string;

  constructor(pkg: Package) {
    if ('id' in pkg && pkg.id) this.id = pkg.id;
    this.packageTypeId = pkg.packageTypeId;
    this.packageName = pkg.packageName;
    this.shortDescription = pkg.shortDescription || undefined;
    this.longDescription = pkg.longDescription || undefined;
    this.description = pkg.description || undefined;
    this.mainImage = pkg.mainImage || undefined;
    this.thumbnail = pkg.thumbnail || undefined;
    this.video = pkg.video || undefined;
    this.basePrice = pkg.basePrice != null ? pkg.basePrice.toString() : undefined;
    this.days = pkg.days;
    this.nights = pkg.nights;
    this.packagecategorymappings = Array.isArray(pkg.packagecategorymappings) ? pkg.packagecategorymappings.map((r: any) => new PackageCategoryMappingResponse({ ...(r as any) })) : [];
    this.packageactivitymappings = Array.isArray(pkg.packageactivitymappings) ? pkg.packageactivitymappings.map((r: any) => new PackageActivityMappingResponse({ ...(r as any) })) : [];
    this.packagesnapshotmappings = Array.isArray(pkg.packagesnapshotmappings) ? pkg.packagesnapshotmappings.map((r: any) => new PackageSnapshotMappingResponse({ ...(r as any) })) : [];
    this.packageType = pkg.packageType && typeof pkg.packageType === 'object' ? new PackageTypeResponse({ ...(pkg.packageType as any) }) : undefined;
    this.packagecities = Array.isArray(pkg.packagecities) ? pkg.packagecities.map((r: any) => new PackageCityResponse({ ...(r as any) })) : [];
    if ('createdAt' in pkg && pkg.createdAt) this.createdAt = moment(pkg.createdAt).format('DD-MM-YYYY');
    if ('updatedAt' in pkg && pkg.updatedAt) this.updatedAt = moment(pkg.updatedAt).format('DD-MM-YYYY');
  }
}
