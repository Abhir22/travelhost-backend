import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { PackageOption, PackageOptionCreateDto, PackageOptionUpdateDto } from '@/modules/packages/entities/package-option.entity';
import { IPackageOptionRepository } from './interfaces/package-option.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class PackageOptionRepository extends BaseRepository<PackageOption, PackageOptionCreateDto, PackageOptionUpdateDto> implements IPackageOptionRepository {
    constructor() {
        super(prisma, 'PackageOption');
    }
}
