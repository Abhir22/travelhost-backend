import moment from 'moment';
import { MealCategory } from '@/modules/travels/entities/mealcategory.entity';

export class MealCategoryResponse {
  id?: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(mealCategory: MealCategory) {
    if ('id' in mealCategory && mealCategory.id) this.id = mealCategory.id;
    this.name = mealCategory.name;
    if ('createdAt' in mealCategory && mealCategory.createdAt) this.createdAt = moment(mealCategory.createdAt).format('DD-MM-YYYY');
    if ('updatedAt' in mealCategory && mealCategory.updatedAt) this.updatedAt = moment(mealCategory.updatedAt).format('DD-MM-YYYY');
  }
}