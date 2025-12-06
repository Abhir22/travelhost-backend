import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { IPackageCityDayService } from '@/modules/packages/services/interfaces/packagecityday.service.interface';
import { PackageCityDay, PackageCityDayCreateDto, PackageCityDayUpdateDto } from '@/modules/packages/entities/packagecityday.entity';
import { PackageCityDayResponse } from '../dtos/packagecityday-response.dto';
import { packagecitydayValidation } from '@/modules/packages/validations/packagecityday.validation';

@injectable()
export class PackageCityDayController extends BaseController<PackageCityDay, PackageCityDayCreateDto, PackageCityDayUpdateDto> {
  constructor(
    @inject('IPackageCityDayService') private packagecitydayService: IPackageCityDayService
  ) {
    super({
      service: packagecitydayService,
      responseClass: PackageCityDayResponse,
      createSchema: packagecitydayValidation.create,
      updateSchema: packagecitydayValidation.update,
      searchFields: ['id'], // Add default search fields, can be customized
      defaultInclude: {}, // Add default include, can be customized
    });
  }
}
