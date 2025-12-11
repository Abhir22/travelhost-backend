import { MealType } from '@/modules/travels/entities/mealtype.entity';

export class MealTypeResponse {
    id?: string;
    name: string;
    description: string | null;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(mealType: MealType) {
        if ('id' in mealType) this.id = mealType.id;
        if ('createdAt' in mealType) this.createdAt = mealType.createdAt;
        if ('updatedAt' in mealType) this.updatedAt = mealType.updatedAt;
        this.name = mealType.name;
        this.description = mealType.description;
    }
}
