import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { PackageCityDayMealType, PackageCityDayMealTypeCreateDto, PackageCityDayMealTypeUpdateDto } from '@/modules/packages/entities/packagecitydaymealtype.entity';
import { IPackageCityDayMealTypeService } from '@/modules/packages/services/interfaces/packagecitydaymealtype.service.interface';
import { PackageCityDayMealTypeResponseDto } from '@/modules/packages/dtos/packagecitydaymealtype-response.dto';
import { packageCityDayMealTypeValidation } from '@/modules/packages/validations/packagecitydaymealtype.validation';

@injectable()
export class PackageCityDayMealTypeController extends BaseController<PackageCityDayMealType, PackageCityDayMealTypeCreateDto, PackageCityDayMealTypeUpdateDto> {
    constructor(
        @inject('IPackageCityDayMealTypeService') service: IPackageCityDayMealTypeService
    ) {
        super({
            service,
            responseClass: PackageCityDayMealTypeResponseDto,
            createSchema: packageCityDayMealTypeValidation.create,
            updateSchema: packageCityDayMealTypeValidation.update,
            searchFields: ['provider', 'description'],
            defaultInclude: {
                packageCityDay: true,
                mealType: true,
                mealCategory: true
            }
        });
    }
}