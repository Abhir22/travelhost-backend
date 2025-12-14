import moment from 'moment';
import { MealType } from '@/modules/travels/entities/mealtype.entity';

export class MealTypeResponse {
    id?: string;
    name: string;
    description: string | null;
    createdAt?: string;
    updatedAt?: string;

    constructor(mealType: MealType) {
        if ('id' in mealType && mealType.id) this.id = mealType.id;
        this.name = mealType.name;
        this.description = mealType.description;
        if ('createdAt' in mealType && mealType.createdAt) this.createdAt = moment(mealType.createdAt).format('DD-MM-YYYY');
        if ('updatedAt' in mealType && mealType.updatedAt) this.updatedAt = moment(mealType.updatedAt).format('DD-MM-YYYY');
    }
}
