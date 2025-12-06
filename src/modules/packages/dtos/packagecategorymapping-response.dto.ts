import { PackageResponse } from '@/modules/packages/dtos/package-response.dto';
import { PackageCategoryResponse } from '@/modules/packages/dtos/packagecategory-response.dto';
import { PackageCategoryMapping } from '@/modules/packages/entities/packagecategorymapping.entity';

export class PackageCategoryMappingResponse {
  id?: string;
  packageId: string;
  categoryId: string;
  package?: PackageResponse;
  category?: PackageCategoryResponse;

  constructor(packagecategorymapping: PackageCategoryMapping) {
    if ('id' in packagecategorymapping) this.id = packagecategorymapping.id;
    this.packageId = packagecategorymapping.packageId;
    this.categoryId = packagecategorymapping.categoryId;
    this.package = packagecategorymapping.package && typeof packagecategorymapping.package === 'object' ? new PackageResponse({ ...(packagecategorymapping.package as any) }) : undefined;
    this.category = packagecategorymapping.category && typeof packagecategorymapping.category === 'object' ? new PackageCategoryResponse({ ...(packagecategorymapping.category as any) }) : undefined;
  }
}
