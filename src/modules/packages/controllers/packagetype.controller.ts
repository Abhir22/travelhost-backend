import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { IPackageTypeService } from '@/modules/packages/services/interfaces/packagetype.service.interface';
import { PackageType, PackageTypeCreateDto, PackageTypeUpdateDto } from '@/modules/packages/entities/packagetype.entity';
import { PackageTypeResponse } from '../dtos/packagetype-response.dto';
import { packagetypeValidation } from '@/modules/packages/validations/packagetype.validation';

@injectable()
export class PackageTypeController extends BaseController<PackageType, PackageTypeCreateDto, PackageTypeUpdateDto> {
  constructor(
    @inject('IPackageTypeService') private packagetypeService: IPackageTypeService
  ) {
    super({
      service: packagetypeService,
      responseClass: PackageTypeResponse,
      createSchema: packagetypeValidation.create,
      updateSchema: packagetypeValidation.update,
      searchFields: ['name'], // Search by package type name
      defaultInclude: {}, // Add default include, can be customized
    });
  }
}
