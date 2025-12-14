import { inject, injectable } from 'tsyringe';
import { BaseService } from '@/core/base/base.service';
import { PackageInclusion, PackageInclusionCreateDto, PackageInclusionUpdateDto } from '@/modules/packages/entities/package-inclusion.entity';
import { IPackageInclusionRepository } from '@/modules/packages/repositories/interfaces/package-inclusion.repository.interface';
import { IPackageInclusionService } from './interfaces/package-inclusion.service.interface';

@injectable()
export class PackageInclusionService extends BaseService<PackageInclusion, PackageInclusionCreateDto, PackageInclusionUpdateDto> implements IPackageInclusionService {
    constructor(
        @inject('IPackageInclusionRepository') repository: IPackageInclusionRepository
    ) {
        super(repository);
    }
}
