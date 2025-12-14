import { IService } from '@/core/interfaces/service.interface';
import { MealCategory, MealCategoryCreateDto, MealCategoryUpdateDto } from '@/modules/travels/entities/mealcategory.entity';

export interface IMealCategoryService extends IService<MealCategory, MealCategoryCreateDto, MealCategoryUpdateDto> {
}