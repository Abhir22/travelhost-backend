import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { PackageCancellationPolicy, PackageCancellationPolicyCreateDto, PackageCancellationPolicyUpdateDto } from '@/modules/packages/entities/package-cancellation-policy.entity';
import { IPackageCancellationPolicyRepository } from './interfaces/package-cancellation-policy.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class PackageCancellationPolicyRepository extends BaseRepository<PackageCancellationPolicy, PackageCancellationPolicyCreateDto, PackageCancellationPolicyUpdateDto> implements IPackageCancellationPolicyRepository {
    constructor() {
        super(prisma, 'PackageCancellationPolicy');
    }
}
