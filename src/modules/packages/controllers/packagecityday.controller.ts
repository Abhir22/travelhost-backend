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
      searchFields: ['description', 'startFrom', 'endAt'], // Search by description and locations
      defaultInclude: {
        packageCity: {
          include: {
            package: {
              include: {
                packageType: true
              }
            },
            cityObj: {
              include: {
                country: true,
                state: true
              }
            }
          }
        },
        packagecitydaytravels: true,
        packagecitydaysightseeings: true,
        packagecitydayhotels: true,
        packagecitydaymeals: true,
        packagecitydaymealtypes: {
          include: {
            mealType: true
          }
        }
      },
    });
  }
}
