import { inject, injectable } from 'tsyringe';
import { PackageCategory, PackageCategoryCreateDto, PackageCategoryUpdateDto } from '@/modules/packages/entities/packagecategory.entity';
import { BaseService } from '@/core/base/base.service';
import { IPackageCategoryService } from '@/modules/packages/services/interfaces/packagecategory.service.interface';
import { NotFoundException, BadRequestException } from '@/core/exceptions/http.exception';

@injectable()
export class PackageCategoryService extends BaseService<PackageCategory, PackageCategoryCreateDto, PackageCategoryUpdateDto> implements IPackageCategoryService {
  constructor(
    @inject('IPackageCategoryRepository') repository: any
  ) {
    super(repository);
  }
}
