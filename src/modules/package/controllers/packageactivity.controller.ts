import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { IPackageActivityService } from '@/modules/package/services/interfaces/packageactivity.service.interface';
import { PackageActivity, PackageActivityCreateDto, PackageActivityUpdateDto } from '@/modules/package/entities/packageactivity.entity';
import { PackageActivityResponse } from '../dtos/packageactivity-response.dto';
import { packageactivityValidation } from '@/modules/package/validations/packageactivity.validation';

@injectable()
export class PackageActivityController extends BaseController<PackageActivity, PackageActivityCreateDto, PackageActivityUpdateDto> {
  constructor(
    @inject('IPackageActivityService') private packageactivityService: IPackageActivityService
  ) {
    super({
      service: packageactivityService,
      responseClass: PackageActivityResponse,
      createSchema: packageactivityValidation.create,
      updateSchema: packageactivityValidation.update,
      searchFields: ['id'], // Add default search fields, can be customized
      defaultInclude: {}, // Add default include, can be customized
    });
  }
}
