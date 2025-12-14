import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { PackageCityDayMealType, PackageCityDayMealTypeCreateDto, PackageCityDayMealTypeUpdateDto } from '@/modules/packages/entities/packagecitydaymealtype.entity';
import { IPackageCityDayMealTypeRepository } from './interfaces/packagecitydaymealtype.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class PackageCityDayMealTypeRepository extends BaseRepository<PackageCityDayMealType, PackageCityDayMealTypeCreateDto, PackageCityDayMealTypeUpdateDto> implements IPackageCityDayMealTypeRepository {
    constructor() {
        super(prisma, 'packageCityDayMealType');
    }
}