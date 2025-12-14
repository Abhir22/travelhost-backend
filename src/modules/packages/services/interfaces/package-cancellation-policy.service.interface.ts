import { IService } from '@/core/interfaces/service.interface';
import { PackageCancellationPolicy, PackageCancellationPolicyCreateDto, PackageCancellationPolicyUpdateDto } from '../../entities/package-cancellation-policy.entity';

export interface IPackageCancellationPolicyService extends IService<PackageCancellationPolicy, PackageCancellationPolicyCreateDto, PackageCancellationPolicyUpdateDto> {
}
