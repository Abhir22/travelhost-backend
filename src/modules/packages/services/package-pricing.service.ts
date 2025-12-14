import { inject, injectable } from 'tsyringe';
import { BaseService } from '@/core/base/base.service';
import { PackagePricing, PackagePricingCreateDto, PackagePricingUpdateDto } from '@/modules/packages/entities/package-pricing.entity';
import { IPackagePricingRepository } from '@/modules/packages/repositories/interfaces/package-pricing.repository.interface';
import { IPackagePricingService } from './interfaces/package-pricing.service.interface';

@injectable()
export class PackagePricingService extends BaseService<PackagePricing, PackagePricingCreateDto, PackagePricingUpdateDto> implements IPackagePricingService {
    constructor(
        @inject('IPackagePricingRepository') repository: IPackagePricingRepository
    ) {
        super(repository);
    }
}
