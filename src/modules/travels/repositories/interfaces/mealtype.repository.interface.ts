import { IRepository } from '@/core/interfaces/repository.interface';
import { MealType, MealTypeCreateDto, MealTypeUpdateDto } from '@/modules/travels/entities/mealtype.entity';

export interface IMealTypeRepository extends IRepository<MealType, MealTypeCreateDto, MealTypeUpdateDto> {
    // Add custom repository methods here
}
