import { IRepository } from '@/core/interfaces/repository.interface';
import { PackageCityDayMealType, PackageCityDayMealTypeCreateDto, PackageCityDayMealTypeUpdateDto } from '@/modules/packages/entities/packagecitydaymealtype.entity';

export interface IPackageCityDayMealTypeRepository extends IRepository<PackageCityDayMealType, PackageCityDayMealTypeCreateDto, PackageCityDayMealTypeUpdateDto> {
}