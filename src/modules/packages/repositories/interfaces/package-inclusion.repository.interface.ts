import { IRepository } from '@/core/interfaces/repository.interface';
import { PackageInclusion, PackageInclusionCreateDto, PackageInclusionUpdateDto } from '../../entities/package-inclusion.entity';

export interface IPackageInclusionRepository extends IRepository<PackageInclusion, PackageInclusionCreateDto, PackageInclusionUpdateDto> {
}
