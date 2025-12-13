import moment from 'moment';
import { PackageCategoryMappingResponse } from '@/modules/packages/dtos/packagecategorymapping-response.dto';
import { PackageCategory } from '@/modules/packages/entities/packagecategory.entity';

export class PackageCategoryResponse {
  id?: string;
  name: string;
  icon?: string;
  packagecategorymappings?: PackageCategoryMappingResponse[];
  createdAt?: string;
  updatedAt?: string;

  constructor(packagecategory: PackageCategory) {
    if ('id' in packagecategory && packagecategory.id) this.id = packagecategory.id;
    this.name = packagecategory.name;
    this.icon = packagecategory.icon || undefined;
    this.packagecategorymappings = Array.isArray(packagecategory.packagecategorymappings) ? packagecategory.packagecategorymappings.map((r: any) => new PackageCategoryMappingResponse({ ...(r as any) })) : [];
    if ('createdAt' in packagecategory && packagecategory.createdAt) this.createdAt = moment(packagecategory.createdAt).format('YYYY-MM-DD');
    if ('updatedAt' in packagecategory && packagecategory.updatedAt) this.updatedAt = moment(packagecategory.updatedAt).format('YYYY-MM-DD');
  }
}
