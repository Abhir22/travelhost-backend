import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { IPackageCityDaySightseeingService } from '@/modules/packages/services/interfaces/packagecitydaysightseeing.service.interface';
import { PackageCityDaySightseeing, PackageCityDaySightseeingCreateDto, PackageCityDaySightseeingUpdateDto } from '@/modules/packages/entities/packagecitydaysightseeing.entity';
import { PackageCityDaySightseeingResponse } from '../dtos/packagecitydaysightseeing-response.dto';
import { packagecitydaysightseeingValidation } from '@/modules/packages/validations/packagecitydaysightseeing.validation';

@injectable()
export class PackageCityDaySightseeingController extends BaseController<PackageCityDaySightseeing, PackageCityDaySightseeingCreateDto, PackageCityDaySightseeingUpdateDto> {
  constructor(
    @inject('IPackageCityDaySightseeingService') private packagecitydaysightseeingService: IPackageCityDaySightseeingService
  ) {
    super({
      service: packagecitydaysightseeingService,
      responseClass: PackageCityDaySightseeingResponse,
      createSchema: packagecitydaysightseeingValidation.create,
      updateSchema: packagecitydaysightseeingValidation.update,
      searchFields: ['id'], // Add default search fields, can be customized
      defaultInclude: {}, // Add default include, can be customized
    });
  }
}
