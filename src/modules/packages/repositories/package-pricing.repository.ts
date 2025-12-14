import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { PackagePricing, PackagePricingCreateDto, PackagePricingUpdateDto } from '@/modules/packages/entities/package-pricing.entity';
import { IPackagePricingRepository } from './interfaces/package-pricing.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class PackagePricingRepository extends BaseRepository<PackagePricing, PackagePricingCreateDto, PackagePricingUpdateDto> implements IPackagePricingRepository {
    constructor() {
        super(prisma, 'PackagePricing');
    }
}
