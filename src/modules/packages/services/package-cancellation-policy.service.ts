import { inject, injectable } from 'tsyringe';
import { BaseService } from '@/core/base/base.service';
import { PackageCancellationPolicy, PackageCancellationPolicyCreateDto, PackageCancellationPolicyUpdateDto } from '@/modules/packages/entities/package-cancellation-policy.entity';
import { IPackageCancellationPolicyRepository } from '@/modules/packages/repositories/interfaces/package-cancellation-policy.repository.interface';
import { IPackageCancellationPolicyService } from './interfaces/package-cancellation-policy.service.interface';

@injectable()
export class PackageCancellationPolicyService extends BaseService<PackageCancellationPolicy, PackageCancellationPolicyCreateDto, PackageCancellationPolicyUpdateDto> implements IPackageCancellationPolicyService {
    constructor(
        @inject('IPackageCancellationPolicyRepository') repository: IPackageCancellationPolicyRepository
    ) {
        super(repository);
    }
}
