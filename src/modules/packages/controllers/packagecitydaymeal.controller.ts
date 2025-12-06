import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { IPackageCityDayMealService } from '@/modules/packages/services/interfaces/packagecitydaymeal.service.interface';
import { PackageCityDayMeal, PackageCityDayMealCreateDto, PackageCityDayMealUpdateDto } from '@/modules/packages/entities/packagecitydaymeal.entity';
import { PackageCityDayMealResponse } from '../dtos/packagecitydaymeal-response.dto';
import { packagecitydaymealValidation } from '@/modules/packages/validations/packagecitydaymeal.validation';

@injectable()
export class PackageCityDayMealController extends BaseController<PackageCityDayMeal, PackageCityDayMealCreateDto, PackageCityDayMealUpdateDto> {
  constructor(
    @inject('IPackageCityDayMealService') private packagecitydaymealService: IPackageCityDayMealService
  ) {
    super({
      service: packagecitydaymealService,
      responseClass: PackageCityDayMealResponse,
      createSchema: packagecitydaymealValidation.create,
      updateSchema: packagecitydaymealValidation.update,
      searchFields: ['id'], // Add default search fields, can be customized
      defaultInclude: {}, // Add default include, can be customized
    });
  }
}
