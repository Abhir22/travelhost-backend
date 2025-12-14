import { IRepository } from '@/core/interfaces/repository.interface';
import { PackagePaymentPolicy, PackagePaymentPolicyCreateDto, PackagePaymentPolicyUpdateDto } from '../../entities/package-payment-policy.entity';

export interface IPackagePaymentPolicyRepository extends IRepository<PackagePaymentPolicy, PackagePaymentPolicyCreateDto, PackagePaymentPolicyUpdateDto> {
}
