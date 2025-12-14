import { inject, injectable } from 'tsyringe';
import { BaseService } from '@/core/base/base.service';
import { PackagePaymentPolicy, PackagePaymentPolicyCreateDto, PackagePaymentPolicyUpdateDto } from '@/modules/packages/entities/package-payment-policy.entity';
import { IPackagePaymentPolicyRepository } from '@/modules/packages/repositories/interfaces/package-payment-policy.repository.interface';
import { IPackagePaymentPolicyService } from './interfaces/package-payment-policy.service.interface';

@injectable()
export class PackagePaymentPolicyService extends BaseService<PackagePaymentPolicy, PackagePaymentPolicyCreateDto, PackagePaymentPolicyUpdateDto> implements IPackagePaymentPolicyService {
    constructor(
        @inject('IPackagePaymentPolicyRepository') repository: IPackagePaymentPolicyRepository
    ) {
        super(repository);
    }
}
