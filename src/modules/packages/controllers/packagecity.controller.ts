import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { IPackageCityService } from '@/modules/packages/services/interfaces/packagecity.service.interface';
import { PackageCity, PackageCityCreateDto, PackageCityUpdateDto } from '@/modules/packages/entities/packagecity.entity';
import { PackageCityResponse } from '../dtos/packagecity-response.dto';
import { packagecityValidation } from '@/modules/packages/validations/packagecity.validation';

@injectable()
export class PackageCityController extends BaseController<PackageCity, PackageCityCreateDto, PackageCityUpdateDto> {
  constructor(
    @inject('IPackageCityService') private packagecityService: IPackageCityService
  ) {
    super({
      service: packagecityService,
      responseClass: PackageCityResponse,
      createSchema: packagecityValidation.create,
      updateSchema: packagecityValidation.update,
      searchFields: ['id'], // Add default search fields, can be customized
      defaultInclude: {}, // Add default include, can be customized
    });
  }
}
