import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { PackageExclusion, PackageExclusionCreateDto, PackageExclusionUpdateDto } from '@/modules/packages/entities/package-exclusion.entity';
import { IPackageExclusionRepository } from './interfaces/package-exclusion.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class PackageExclusionRepository extends BaseRepository<PackageExclusion, PackageExclusionCreateDto, PackageExclusionUpdateDto> implements IPackageExclusionRepository {
    constructor() {
        super(prisma, 'PackageExclusion');
    }
}
