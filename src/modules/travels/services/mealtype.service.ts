import { inject, injectable } from 'tsyringe';
import { BaseService } from '@/core/base/base.service';
import { MealType, MealTypeCreateDto, MealTypeUpdateDto } from '@/modules/travels/entities/mealtype.entity';
import { IMealTypeRepository } from '@/modules/travels/repositories/interfaces/mealtype.repository.interface';
import { IMealTypeService } from '@/modules/travels/services/interfaces/mealtype.service.interface';

@injectable()
export class MealTypeService extends BaseService<MealType, MealTypeCreateDto, MealTypeUpdateDto> implements IMealTypeService {
    constructor(
        @inject('IMealTypeRepository') repository: IMealTypeRepository
    ) {
        super(repository);
    }
}
