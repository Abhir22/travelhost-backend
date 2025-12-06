import { IService } from '@/core/interfaces/service.interface';
import { Package, PackageCreateDto, PackageUpdateDto } from '@/modules/packages/entities/package.entity';

export interface IPackageService extends IService<Package, PackageCreateDto, PackageUpdateDto> {
  // Add custom service methods here
}
