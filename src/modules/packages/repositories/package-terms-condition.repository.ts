import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { PackageTermsCondition, PackageTermsConditionCreateDto, PackageTermsConditionUpdateDto } from '@/modules/packages/entities/package-terms-condition.entity';
import { IPackageTermsConditionRepository } from './interfaces/package-terms-condition.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class PackageTermsConditionRepository extends BaseRepository<PackageTermsCondition, PackageTermsConditionCreateDto, PackageTermsConditionUpdateDto> implements IPackageTermsConditionRepository {
    constructor() {
        super(prisma, 'PackageTermsCondition');
    }
}
