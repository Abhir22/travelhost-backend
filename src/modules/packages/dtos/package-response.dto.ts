import moment from 'moment';
import { PackageCategoryMappingResponse } from '@/modules/packages/dtos/packagecategorymapping-response.dto';
import { PackageActivityMappingResponse } from '@/modules/packages/dtos/packageactivitymapping-response.dto';
import { PackageSnapshotMappingResponse } from '@/modules/packages/dtos/packagesnapshotmapping-response.dto';
import { PackageCityResponse } from '@/modules/packages/dtos/packagecity-response.dto';
import { PackageGalleryResponse } from '@/modules/packages/dtos/package-gallery-response.dto';
import { PackagePricingResponse } from '@/modules/packages/dtos/package-pricing-response.dto';
import { PackageOptionResponse } from '@/modules/packages/dtos/package-option-response.dto';
import { PackageTermsConditionResponse } from '@/modules/packages/dtos/package-terms-condition-response.dto';
import { PackageInclusionResponse } from '@/modules/packages/dtos/package-inclusion-response.dto';
import { PackageExclusionResponse } from '@/modules/packages/dtos/package-exclusion-response.dto';
import { PackagePaymentPolicyResponse } from '@/modules/packages/dtos/package-payment-policy-response.dto';
import { PackageCancellationPolicyResponse } from '@/modules/packages/dtos/package-cancellation-policy-response.dto';

import { Package } from '@/modules/packages/entities/package.entity';

export class PackageResponse {
  id?: string;
  packageType: string;
  packageName: string;
  shortDescription?: string;
  longDescription?: string;
  mainImage?: string;
  thumbnail?: string;
  video?: string;
  basePrice?: string;
  duration: string;
  packagecategorymappings?: PackageCategoryMappingResponse[];
  packageactivitymappings?: PackageActivityMappingResponse[];
  packagesnapshotmappings?: PackageSnapshotMappingResponse[];
  packagecities?: PackageCityResponse[];
  packageGalleries?: PackageGalleryResponse[];
  packagePricings?: PackagePricingResponse[];
  packageOptions?: PackageOptionResponse[];
  packageTermsConditions?: PackageTermsConditionResponse[];
  packageInclusions?: PackageInclusionResponse[];
  packageExclusions?: PackageExclusionResponse[];
  packagePaymentPolicies?: PackagePaymentPolicyResponse[];
  packageCancellationPolicies?: PackageCancellationPolicyResponse[];
  createdAt?: string;
  updatedAt?: string;

  constructor(pkg: Package) {
    if ('id' in pkg && pkg.id) this.id = pkg.id;
    this.packageType = pkg.packageType;
    this.packageName = pkg.packageName;
    this.shortDescription = pkg.shortDescription || undefined;
    this.longDescription = pkg.longDescription || undefined;
    this.mainImage = pkg.mainImage || undefined;
    this.thumbnail = pkg.thumbnail || undefined;
    this.video = pkg.video || undefined;
    this.basePrice = pkg.basePrice != null ? pkg.basePrice.toString() : undefined;
    this.duration = pkg.duration;
    this.packagecategorymappings = Array.isArray(pkg.packagecategorymappings) ? pkg.packagecategorymappings.map((r: any) => new PackageCategoryMappingResponse({ ...(r as any) })) : [];
    this.packageactivitymappings = Array.isArray(pkg.packageactivitymappings) ? pkg.packageactivitymappings.map((r: any) => new PackageActivityMappingResponse({ ...(r as any) })) : [];
    this.packagesnapshotmappings = Array.isArray(pkg.packagesnapshotmappings) ? pkg.packagesnapshotmappings.map((r: any) => new PackageSnapshotMappingResponse({ ...(r as any) })) : [];
    this.packagecities = Array.isArray(pkg.packagecities) ? pkg.packagecities.map((r: any) => new PackageCityResponse({ ...(r as any) })) : [];

    // Package galleries with S3 URL transformation
    this.packageGalleries = Array.isArray(pkg.packageGalleries) ? pkg.packageGalleries.map((r: any) => new PackageGalleryResponse({ ...(r as any) })) : [];

    // Package pricing and options
    this.packagePricings = Array.isArray(pkg.packagePricings) ? pkg.packagePricings.map((r: any) => new PackagePricingResponse({ ...(r as any) })) : [];
    this.packageOptions = Array.isArray(pkg.packageOptions) ? pkg.packageOptions.map((r: any) => new PackageOptionResponse({ ...(r as any) })) : [];

    // Package policies
    this.packageTermsConditions = Array.isArray(pkg.packageTermsConditions) ? pkg.packageTermsConditions.map((r: any) => new PackageTermsConditionResponse({ ...(r as any) })) : [];
    this.packageInclusions = Array.isArray(pkg.packageInclusions) ? pkg.packageInclusions.map((r: any) => new PackageInclusionResponse({ ...(r as any) })) : [];
    this.packageExclusions = Array.isArray(pkg.packageExclusions) ? pkg.packageExclusions.map((r: any) => new PackageExclusionResponse({ ...(r as any) })) : [];
    this.packagePaymentPolicies = Array.isArray(pkg.packagePaymentPolicies) ? pkg.packagePaymentPolicies.map((r: any) => new PackagePaymentPolicyResponse({ ...(r as any) })) : [];
    this.packageCancellationPolicies = Array.isArray(pkg.packageCancellationPolicies) ? pkg.packageCancellationPolicies.map((r: any) => new PackageCancellationPolicyResponse({ ...(r as any) })) : [];

    if ('createdAt' in pkg && pkg.createdAt) this.createdAt = moment(pkg.createdAt).format('DD-MM-YYYY');
    if ('updatedAt' in pkg && pkg.updatedAt) this.updatedAt = moment(pkg.updatedAt).format('DD-MM-YYYY');
  }
}
