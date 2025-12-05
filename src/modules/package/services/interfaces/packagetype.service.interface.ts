import { IService } from '@/core/interfaces/service.interface';
import { PackageType, PackageTypeCreateDto, PackageTypeUpdateDto } from '@/modules/package/entities/packagetype.entity';

export interface IPackageTypeService extends IService<PackageType, PackageTypeCreateDto, PackageTypeUpdateDto> {
  // Add custom service methods here
}
