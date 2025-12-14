import { IService } from '@/core/interfaces/service.interface';
import { PackagePricing, PackagePricingCreateDto, PackagePricingUpdateDto } from '../../entities/package-pricing.entity';

export interface IPackagePricingService extends IService<PackagePricing, PackagePricingCreateDto, PackagePricingUpdateDto> {
}
