import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { MealType, MealTypeCreateDto, MealTypeUpdateDto } from '@/modules/travels/entities/mealtype.entity';
import { IMealTypeRepository } from '@/modules/travels/repositories/interfaces/mealtype.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class MealTypeRepository extends BaseRepository<MealType, MealTypeCreateDto, MealTypeUpdateDto> implements IMealTypeRepository {
    constructor() {
        super(prisma, 'MealType');
    }
}
