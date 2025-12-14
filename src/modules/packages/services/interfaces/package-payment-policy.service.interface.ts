import { IService } from '@/core/interfaces/service.interface';
import { PackagePaymentPolicy, PackagePaymentPolicyCreateDto, PackagePaymentPolicyUpdateDto } from '../../entities/package-payment-policy.entity';

export interface IPackagePaymentPolicyService extends IService<PackagePaymentPolicy, PackagePaymentPolicyCreateDto, PackagePaymentPolicyUpdateDto> {
}
