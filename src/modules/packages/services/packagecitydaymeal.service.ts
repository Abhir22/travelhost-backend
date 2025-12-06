import { inject, injectable } from 'tsyringe';
import { PackageCityDayMeal, PackageCityDayMealCreateDto, PackageCityDayMealUpdateDto } from '@/modules/packages/entities/packagecitydaymeal.entity';
import { BaseService } from '@/core/base/base.service';
import { IPackageCityDayMealService } from '@/modules/packages/services/interfaces/packagecitydaymeal.service.interface';
import { NotFoundException, BadRequestException } from '@/core/exceptions/http.exception';

@injectable()
export class PackageCityDayMealService extends BaseService<PackageCityDayMeal, PackageCityDayMealCreateDto, PackageCityDayMealUpdateDto> implements IPackageCityDayMealService {
  constructor(
    @inject('IPackageCityDayMealRepository') repository: any
  ) {
    super(repository);
  }
}
