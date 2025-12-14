import { IService } from '@/core/interfaces/service.interface';
import { PackageInclusion, PackageInclusionCreateDto, PackageInclusionUpdateDto } from '../../entities/package-inclusion.entity';

export interface IPackageInclusionService extends IService<PackageInclusion, PackageInclusionCreateDto, PackageInclusionUpdateDto> {
}
