import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { IMealTypeService } from '@/modules/travels/services/interfaces/mealtype.service.interface';
import { MealType, MealTypeCreateDto, MealTypeUpdateDto } from '@/modules/travels/entities/mealtype.entity';
import { MealTypeResponse } from '../dtos/mealtype-response.dto';
import { mealTypeValidation } from '@/modules/travels/validations/mealtype.validation';

@injectable()
export class MealTypeController extends BaseController<MealType, MealTypeCreateDto, MealTypeUpdateDto> {
    constructor(
        @inject('IMealTypeService') private mealTypeService: IMealTypeService
    ) {
        super({
            service: mealTypeService,
            responseClass: MealTypeResponse,
            createSchema: mealTypeValidation.create,
            updateSchema: mealTypeValidation.update,
            searchFields: ['name'],
            defaultInclude: {},
        });
    }
}
