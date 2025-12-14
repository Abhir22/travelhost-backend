import { IService } from '@/core/interfaces/service.interface';
import { PackageCityDayMealType, PackageCityDayMealTypeCreateDto, PackageCityDayMealTypeUpdateDto } from '@/modules/packages/entities/packagecitydaymealtype.entity';

export interface IPackageCityDayMealTypeService extends IService<PackageCityDayMealType, PackageCityDayMealTypeCreateDto, PackageCityDayMealTypeUpdateDto> {
}