import moment from 'moment';

export class PackageCityDayMealTypeResponseDto {
  id: string;
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
  createdAt?: string;
  updatedAt?: string;

  constructor(packagecitydaymealtype: any) {
    this.id = packagecitydaymealtype.id;
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
    if ('createdAt' in packagecitydaymealtype && packagecitydaymealtype.createdAt) this.createdAt = moment(packagecitydaymealtype.createdAt).format('DD-MM-YYYY');
    if ('updatedAt' in packagecitydaymealtype && packagecitydaymealtype.updatedAt) this.updatedAt = moment(packagecitydaymealtype.updatedAt).format('DD-MM-YYYY');
  }
}
