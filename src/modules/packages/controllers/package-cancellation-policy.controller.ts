import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { PackageCancellationPolicy, PackageCancellationPolicyCreateDto, PackageCancellationPolicyUpdateDto } from '@/modules/packages/entities/package-cancellation-policy.entity';
import { IPackageCancellationPolicyService } from '@/modules/packages/services/interfaces/package-cancellation-policy.service.interface';
import { PackageCancellationPolicyResponse } from '@/modules/packages/dtos/package-cancellation-policy-response.dto';
import { packageCancellationPolicyValidation } from '@/modules/packages/validations/package-cancellation-policy.validation';

@injectable()
export class PackageCancellationPolicyController extends BaseController<PackageCancellationPolicy, PackageCancellationPolicyCreateDto, PackageCancellationPolicyUpdateDto> {
    constructor(
        @inject('IPackageCancellationPolicyService') service: IPackageCancellationPolicyService
    ) {
        super({
            service,
            responseClass: PackageCancellationPolicyResponse,
            createSchema: packageCancellationPolicyValidation.create,
            updateSchema: packageCancellationPolicyValidation.update,
            searchFields: ['content'],
        });
    }
}
