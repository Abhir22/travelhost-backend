import { inject, injectable } from 'tsyringe';
import { BaseService } from '@/core/base/base.service';
import { PackageExclusion, PackageExclusionCreateDto, PackageExclusionUpdateDto } from '@/modules/packages/entities/package-exclusion.entity';
import { IPackageExclusionRepository } from '@/modules/packages/repositories/interfaces/package-exclusion.repository.interface';
import { IPackageExclusionService } from './interfaces/package-exclusion.service.interface';

@injectable()
export class PackageExclusionService extends BaseService<PackageExclusion, PackageExclusionCreateDto, PackageExclusionUpdateDto> implements IPackageExclusionService {
    constructor(
        @inject('IPackageExclusionRepository') repository: IPackageExclusionRepository
    ) {
        super(repository);
    }
}
