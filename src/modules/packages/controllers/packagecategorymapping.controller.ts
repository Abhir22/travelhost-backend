import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { IPackageCategoryMappingService } from '@/modules/packages/services/interfaces/packagecategorymapping.service.interface';
import { PackageCategoryMapping, PackageCategoryMappingCreateDto, PackageCategoryMappingUpdateDto } from '@/modules/packages/entities/packagecategorymapping.entity';
import { PackageCategoryMappingResponse } from '../dtos/packagecategorymapping-response.dto';
import { packagecategorymappingValidation } from '@/modules/packages/validations/packagecategorymapping.validation';

@injectable()
export class PackageCategoryMappingController extends BaseController<PackageCategoryMapping, PackageCategoryMappingCreateDto, PackageCategoryMappingUpdateDto> {
  constructor(
    @inject('IPackageCategoryMappingService') private packagecategorymappingService: IPackageCategoryMappingService
  ) {
    super({
      service: packagecategorymappingService,
      responseClass: PackageCategoryMappingResponse,
      createSchema: packagecategorymappingValidation.create,
      updateSchema: packagecategorymappingValidation.update,
      searchFields: [], // Mapping table - no searchable text fields
      defaultInclude: {}, // Add default include, can be customized
    });
  }
}
