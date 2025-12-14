import { IRepository } from '@/core/interfaces/repository.interface';
import { PackageOption, PackageOptionCreateDto, PackageOptionUpdateDto } from '../../entities/package-option.entity';

export interface IPackageOptionRepository extends IRepository<PackageOption, PackageOptionCreateDto, PackageOptionUpdateDto> {
}
