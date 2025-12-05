import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { IPackageTypeService } from '@/modules/package/services/interfaces/packagetype.service.interface';
import { PackageType, PackageTypeCreateDto, PackageTypeUpdateDto } from '@/modules/package/entities/packagetype.entity';
import { PackageTypeResponse } from '../dtos/packagetype-response.dto';
import { packagetypeValidation } from '@/modules/package/validations/packagetype.validation';

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
      searchFields: ['id'], // Add default search fields, can be customized
      defaultInclude: {}, // Add default include, can be customized
    });
  }
}
