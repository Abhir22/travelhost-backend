import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { PackagePricing, PackagePricingCreateDto, PackagePricingUpdateDto } from '@/modules/packages/entities/package-pricing.entity';
import { IPackagePricingService } from '@/modules/packages/services/interfaces/package-pricing.service.interface';
import { PackagePricingResponse } from '@/modules/packages/dtos/package-pricing-response.dto';
import { packagePricingValidation } from '@/modules/packages/validations/package-pricing.validation';

@injectable()
export class PackagePricingController extends BaseController<PackagePricing, PackagePricingCreateDto, PackagePricingUpdateDto> {
    constructor(
        @inject('IPackagePricingService') service: IPackagePricingService
    ) {
        super({
            service,
            responseClass: PackagePricingResponse,
            createSchema: packagePricingValidation.create,
            updateSchema: packagePricingValidation.update,
            searchFields: [],
        });
    }
}
