export class PackageMealTypeResponseDto {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  packageId: string;
  mealTypeId: string;
  mealType?: {
    id: string;
    name: string;
    description?: string;
  };

  constructor(packagemealtype: any) {
    this.id = packagemealtype.id;
    if ('createdAt' in packagemealtype) this.createdAt = packagemealtype.createdAt;
    if ('updatedAt' in packagemealtype) this.updatedAt = packagemealtype.updatedAt;
    this.packageId = packagemealtype.packageId;
    this.mealTypeId = packagemealtype.mealTypeId;
    if (packagemealtype.mealType) {
      this.mealType = {
        id: packagemealtype.mealType.id,
        name: packagemealtype.mealType.name,
        description: packagemealtype.mealType.description || undefined,
      };
    }
  }
}