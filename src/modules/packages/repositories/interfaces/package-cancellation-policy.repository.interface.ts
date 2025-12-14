import { IRepository } from '@/core/interfaces/repository.interface';
import { PackageCancellationPolicy, PackageCancellationPolicyCreateDto, PackageCancellationPolicyUpdateDto } from '../../entities/package-cancellation-policy.entity';

export interface IPackageCancellationPolicyRepository extends IRepository<PackageCancellationPolicy, PackageCancellationPolicyCreateDto, PackageCancellationPolicyUpdateDto> {
}
