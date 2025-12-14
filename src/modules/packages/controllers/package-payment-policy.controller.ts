import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { PackagePaymentPolicy, PackagePaymentPolicyCreateDto, PackagePaymentPolicyUpdateDto } from '@/modules/packages/entities/package-payment-policy.entity';
import { IPackagePaymentPolicyService } from '@/modules/packages/services/interfaces/package-payment-policy.service.interface';
import { PackagePaymentPolicyResponse } from '@/modules/packages/dtos/package-payment-policy-response.dto';
import { packagePaymentPolicyValidation } from '@/modules/packages/validations/package-payment-policy.validation';

@injectable()
export class PackagePaymentPolicyController extends BaseController<PackagePaymentPolicy, PackagePaymentPolicyCreateDto, PackagePaymentPolicyUpdateDto> {
    constructor(
        @inject('IPackagePaymentPolicyService') service: IPackagePaymentPolicyService
    ) {
        super({
            service,
            responseClass: PackagePaymentPolicyResponse,
            createSchema: packagePaymentPolicyValidation.create,
            updateSchema: packagePaymentPolicyValidation.update,
            searchFields: ['content'],
        });
    }
}
