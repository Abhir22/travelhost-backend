import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { PackageInclusion, PackageInclusionCreateDto, PackageInclusionUpdateDto } from '@/modules/packages/entities/package-inclusion.entity';
import { IPackageInclusionRepository } from './interfaces/package-inclusion.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class PackageInclusionRepository extends BaseRepository<PackageInclusion, PackageInclusionCreateDto, PackageInclusionUpdateDto> implements IPackageInclusionRepository {
    constructor() {
        super(prisma, 'PackageInclusion');
    }
}
