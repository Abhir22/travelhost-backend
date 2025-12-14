import { IRepository } from '@/core/interfaces/repository.interface';
import { MealCategory, MealCategoryCreateDto, MealCategoryUpdateDto } from '@/modules/travels/entities/mealcategory.entity';

export interface IMealCategoryRepository extends IRepository<MealCategory, MealCategoryCreateDto, MealCategoryUpdateDto> {
}