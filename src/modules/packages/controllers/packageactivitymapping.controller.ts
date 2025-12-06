import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { IPackageActivityMappingService } from '@/modules/packages/services/interfaces/packageactivitymapping.service.interface';
import { PackageActivityMapping, PackageActivityMappingCreateDto, PackageActivityMappingUpdateDto } from '@/modules/packages/entities/packageactivitymapping.entity';
import { PackageActivityMappingResponse } from '../dtos/packageactivitymapping-response.dto';
import { packageactivitymappingValidation } from '@/modules/packages/validations/packageactivitymapping.validation';

@injectable()
export class PackageActivityMappingController extends BaseController<PackageActivityMapping, PackageActivityMappingCreateDto, PackageActivityMappingUpdateDto> {
  constructor(
    @inject('IPackageActivityMappingService') private packageactivitymappingService: IPackageActivityMappingService
  ) {
    super({
      service: packageactivitymappingService,
      responseClass: PackageActivityMappingResponse,
      createSchema: packageactivitymappingValidation.create,
      updateSchema: packageactivitymappingValidation.update,
      searchFields: ['id'], // Add default search fields, can be customized
      defaultInclude: {}, // Add default include, can be customized
    });
  }
}
