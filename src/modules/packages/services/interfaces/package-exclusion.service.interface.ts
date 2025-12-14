import { IService } from '@/core/interfaces/service.interface';
import { PackageExclusion, PackageExclusionCreateDto, PackageExclusionUpdateDto } from '../../entities/package-exclusion.entity';

export interface IPackageExclusionService extends IService<PackageExclusion, PackageExclusionCreateDto, PackageExclusionUpdateDto> {
}
