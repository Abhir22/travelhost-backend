export class MealTypeResponseDto {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  description?: string;

  constructor(mealtype: any) {
    this.id = mealtype.id;
    if ('createdAt' in mealtype) this.createdAt = mealtype.createdAt;
    if ('updatedAt' in mealtype) this.updatedAt = mealtype.updatedAt;
    this.name = mealtype.name;
    this.description = mealtype.description || undefined;
  }
}