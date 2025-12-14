import { inject, injectable } from 'tsyringe';
import { BaseService } from '@/core/base/base.service';
import { MealCategory, MealCategoryCreateDto, MealCategoryUpdateDto } from '@/modules/travels/entities/mealcategory.entity';
import { IMealCategoryRepository } from '@/modules/travels/repositories/interfaces/mealcategory.repository.interface';
import { IMealCategoryService } from './interfaces/mealcategory.service.interface';

@injectable()
export class MealCategoryService extends BaseService<MealCategory, MealCategoryCreateDto, MealCategoryUpdateDto> implements IMealCategoryService {
    constructor(
        @inject('IMealCategoryRepository') repository: IMealCategoryRepository
    ) {
        super(repository);
    }
}