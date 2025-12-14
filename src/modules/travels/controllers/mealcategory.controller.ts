import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { IMealCategoryService } from '@/modules/travels/services/interfaces/mealcategory.service.interface';
import { MealCategory, MealCategoryCreateDto, MealCategoryUpdateDto } from '@/modules/travels/entities/mealcategory.entity';
import { MealCategoryResponse } from '../dtos/mealcategory-response.dto';
import { mealCategoryValidation } from '@/modules/travels/validations/mealcategory.validation';

@injectable()
export class MealCategoryController extends BaseController<MealCategory, MealCategoryCreateDto, MealCategoryUpdateDto> {
    constructor(
        @inject('IMealCategoryService') private mealCategoryService: IMealCategoryService
    ) {
        super({
            service: mealCategoryService,
            responseClass: MealCategoryResponse,
            createSchema: mealCategoryValidation.create,
            updateSchema: mealCategoryValidation.update,
            searchFields: ['name'],
            defaultInclude: {},
        });
    }
}