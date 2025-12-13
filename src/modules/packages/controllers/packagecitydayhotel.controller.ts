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
      searchFields: ['hotelName', 'hotelType', 'roomType'], // Search by hotel name, type, and room type
      defaultInclude: {
        packageCityDay: {
          include: {
            packageCity: {
              include: {
                package: true,
                cityObj: true
              }
            }
          }
        }
      },
    });
  }
}
