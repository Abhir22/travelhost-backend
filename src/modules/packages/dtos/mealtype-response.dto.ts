import moment from 'moment';

export class MealTypeResponseDto {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(mealtype: any) {
    this.id = mealtype.id;
    this.name = mealtype.name;
    this.description = mealtype.description || undefined;
    if ('createdAt' in mealtype && mealtype.createdAt) this.createdAt = moment(mealtype.createdAt).format('DD-MM-YYYY');
    if ('updatedAt' in mealtype && mealtype.updatedAt) this.updatedAt = moment(mealtype.updatedAt).format('DD-MM-YYYY');
  }
}
