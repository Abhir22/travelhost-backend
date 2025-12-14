import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { PackagePaymentPolicy, PackagePaymentPolicyCreateDto, PackagePaymentPolicyUpdateDto } from '@/modules/packages/entities/package-payment-policy.entity';
import { IPackagePaymentPolicyRepository } from './interfaces/package-payment-policy.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class PackagePaymentPolicyRepository extends BaseRepository<PackagePaymentPolicy, PackagePaymentPolicyCreateDto, PackagePaymentPolicyUpdateDto> implements IPackagePaymentPolicyRepository {
    constructor() {
        super(prisma, 'PackagePaymentPolicy');
    }
}
