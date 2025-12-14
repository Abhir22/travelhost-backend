import { inject, injectable } from 'tsyringe';
import { BaseService } from '@/core/base/base.service';
import { PackageCityDayMealType, PackageCityDayMealTypeCreateDto, PackageCityDayMealTypeUpdateDto } from '@/modules/packages/entities/packagecitydaymealtype.entity';
import { IPackageCityDayMealTypeRepository } from '@/modules/packages/repositories/interfaces/packagecitydaymealtype.repository.interface';
import { IPackageCityDayMealTypeService } from './interfaces/packagecitydaymealtype.service.interface';

@injectable()
export class PackageCityDayMealTypeService extends BaseService<PackageCityDayMealType, PackageCityDayMealTypeCreateDto, PackageCityDayMealTypeUpdateDto> implements IPackageCityDayMealTypeService {
    constructor(
        @inject('IPackageCityDayMealTypeRepository') repository: IPackageCityDayMealTypeRepository
    ) {
        super(repository);
    }
}