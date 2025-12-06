import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { IPackageActivityService } from '@/modules/packages/services/interfaces/packageactivity.service.interface';
import { PackageActivity, PackageActivityCreateDto, PackageActivityUpdateDto } from '@/modules/packages/entities/packageactivity.entity';
import { PackageActivityResponse } from '../dtos/packageactivity-response.dto';
import { packageactivityValidation } from '@/modules/packages/validations/packageactivity.validation';

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
      searchFields: ['name'], // Search by activity name
      defaultInclude: {}, // Add default include, can be customized
    });
  }
}
