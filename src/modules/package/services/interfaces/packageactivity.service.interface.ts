import { IService } from '@/core/interfaces/service.interface';
import { PackageActivity, PackageActivityCreateDto, PackageActivityUpdateDto } from '@/modules/package/entities/packageactivity.entity';

export interface IPackageActivityService extends IService<PackageActivity, PackageActivityCreateDto, PackageActivityUpdateDto> {
  // Add custom service methods here
}
