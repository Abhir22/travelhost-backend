import { IRepository } from '@/core/interfaces/repository.interface';
import { PackagePricing, PackagePricingCreateDto, PackagePricingUpdateDto } from '../../entities/package-pricing.entity';

export interface IPackagePricingRepository extends IRepository<PackagePricing, PackagePricingCreateDto, PackagePricingUpdateDto> {
}
