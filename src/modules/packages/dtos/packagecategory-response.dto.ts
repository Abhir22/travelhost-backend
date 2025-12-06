import { PackageCategoryMappingResponse } from '@/modules/packages/dtos/packagecategorymapping-response.dto';
import { PackageCategory } from '@/modules/packages/entities/packagecategory.entity';

export class PackageCategoryResponse {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  icon?: string;
  packagecategorymappings?: PackageCategoryMappingResponse[];

  constructor(packagecategory: PackageCategory) {
    if ('id' in packagecategory) this.id = packagecategory.id;
    if ('createdAt' in packagecategory) this.createdAt = packagecategory.createdAt;
    if ('updatedAt' in packagecategory) this.updatedAt = packagecategory.updatedAt;
    this.name = packagecategory.name;
    this.icon = packagecategory.icon || undefined;
    this.packagecategorymappings = Array.isArray(packagecategory.packagecategorymappings) ? packagecategory.packagecategorymappings.map((r: any) => new PackageCategoryMappingResponse({ ...(r as any) })) : [];
  }
}
