export class PackageCityDayMealTypeResponseDto {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  packageCityDayId: string;
  mealTypeId: string;
  provider?: string;
  time?: string;
  description?: string;
  mealType?: {
    id: string;
    name: string;
    description?: string;
  };

  constructor(packagecitydaymealtype: any) {
    this.id = packagecitydaymealtype.id;
    if ('createdAt' in packagecitydaymealtype) this.createdAt = packagecitydaymealtype.createdAt;
    if ('updatedAt' in packagecitydaymealtype) this.updatedAt = packagecitydaymealtype.updatedAt;
    this.packageCityDayId = packagecitydaymealtype.packageCityDayId;
    this.mealTypeId = packagecitydaymealtype.mealTypeId;
    this.provider = packagecitydaymealtype.provider || undefined;
    this.time = packagecitydaymealtype.time || undefined;
    this.description = packagecitydaymealtype.description || undefined;
    if (packagecitydaymealtype.mealType) {
      this.mealType = {
        id: packagecitydaymealtype.mealType.id,
        name: packagecitydaymealtype.mealType.name,
        description: packagecitydaymealtype.mealType.description || undefined,
      };
    }
  }
}