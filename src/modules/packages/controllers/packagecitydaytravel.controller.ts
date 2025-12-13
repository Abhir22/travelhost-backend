import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { IPackageCityDayTravelService } from '@/modules/packages/services/interfaces/packagecitydaytravel.service.interface';
import { PackageCityDayTravel, PackageCityDayTravelCreateDto, PackageCityDayTravelUpdateDto } from '@/modules/packages/entities/packagecitydaytravel.entity';
import { PackageCityDayTravelResponse } from '../dtos/packagecitydaytravel-response.dto';
import { packagecitydaytravelValidation } from '@/modules/packages/validations/packagecitydaytravel.validation';

@injectable()
export class PackageCityDayTravelController extends BaseController<PackageCityDayTravel, PackageCityDayTravelCreateDto, PackageCityDayTravelUpdateDto> {
  constructor(
    @inject('IPackageCityDayTravelService') private packagecitydaytravelService: IPackageCityDayTravelService
  ) {
    super({
      service: packagecitydaytravelService,
      responseClass: PackageCityDayTravelResponse,
      createSchema: packagecitydaytravelValidation.create,
      updateSchema: packagecitydaytravelValidation.update,
      searchFields: ['type', 'vehicleType', 'description'], // Search by travel type, vehicle type, and description
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
