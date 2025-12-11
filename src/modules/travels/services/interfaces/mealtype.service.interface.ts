import { IService } from '@/core/interfaces/service.interface';
import { MealType, MealTypeCreateDto, MealTypeUpdateDto } from '@/modules/travels/entities/mealtype.entity';

export interface IMealTypeService extends IService<MealType, MealTypeCreateDto, MealTypeUpdateDto> {
    // Add custom service methods here
}
