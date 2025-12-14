import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { IPackageCategoryService } from '@/modules/packages/services/interfaces/packagecategory.service.interface';
import { PackageCategory, PackageCategoryCreateDto, PackageCategoryUpdateDto } from '@/modules/packages/entities/packagecategory.entity';
import { PackageCategoryResponse } from '../dtos/packagecategory-response.dto';
import { packagecategoryValidation } from '@/modules/packages/validations/packagecategory.validation';

@injectable()
export class PackageCategoryController extends BaseController<PackageCategory, PackageCategoryCreateDto, PackageCategoryUpdateDto> {
  constructor(
    @inject('IPackageCategoryService') private packagecategoryService: IPackageCategoryService
  ) {
    super({
      service: packagecategoryService,
      responseClass: PackageCategoryResponse,
      createSchema: packagecategoryValidation.create,
      updateSchema: packagecategoryValidation.update,
      searchFields: ['name'], // Search by category name
      defaultInclude: {
      },
    });
  }
}
