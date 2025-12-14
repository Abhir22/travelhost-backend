import { IRepository } from '@/core/interfaces/repository.interface';
import { PackageExclusion, PackageExclusionCreateDto, PackageExclusionUpdateDto } from '../../entities/package-exclusion.entity';

export interface IPackageExclusionRepository extends IRepository<PackageExclusion, PackageExclusionCreateDto, PackageExclusionUpdateDto> {
}
