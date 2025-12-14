import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { MealCategory, MealCategoryCreateDto, MealCategoryUpdateDto } from '@/modules/travels/entities/mealcategory.entity';
import { IMealCategoryRepository } from './interfaces/mealcategory.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class MealCategoryRepository extends BaseRepository<MealCategory, MealCategoryCreateDto, MealCategoryUpdateDto> implements IMealCategoryRepository {
    constructor() {
        super(prisma, 'mealCategory');
    }
}