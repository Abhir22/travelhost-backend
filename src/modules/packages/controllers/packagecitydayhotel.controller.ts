import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { IPackageCityDayHotelService } from '@/modules/packages/services/interfaces/packagecitydayhotel.service.interface';
import { PackageCityDayHotel, PackageCityDayHotelCreateDto, PackageCityDayHotelUpdateDto } from '@/modules/packages/entities/packagecitydayhotel.entity';
import { PackageCityDayHotelResponse } from '../dtos/packagecitydayhotel-response.dto';
import { packagecitydayhotelValidation } from '@/modules/packages/validations/packagecitydayhotel.validation';

@injectable()
export class PackageCityDayHotelController extends BaseController<PackageCityDayHotel, PackageCityDayHotelCreateDto, PackageCityDayHotelUpdateDto> {
  constructor(
    @inject('IPackageCityDayHotelService') private packagecitydayhotelService: IPackageCityDayHotelService
  ) {
    super({
      service: packagecitydayhotelService,
      responseClass: PackageCityDayHotelResponse,
      createSchema: packagecitydayhotelValidation.create,
      updateSchema: packagecitydayhotelValidation.update,
      searchFields: ['id'], // Add default search fields, can be customized
      defaultInclude: {}, // Add default include, can be customized
    });
  }
}
