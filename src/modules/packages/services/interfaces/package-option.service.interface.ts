import { IService } from '@/core/interfaces/service.interface';
import { PackageOption, PackageOptionCreateDto, PackageOptionUpdateDto } from '../../entities/package-option.entity';

export interface IPackageOptionService extends IService<PackageOption, PackageOptionCreateDto, PackageOptionUpdateDto> {
}
