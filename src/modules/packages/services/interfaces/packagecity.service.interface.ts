import { IService } from '@/core/interfaces/service.interface';
import { PackageCity, PackageCityCreateDto, PackageCityUpdateDto } from '@/modules/packages/entities/packagecity.entity';

export interface IPackageCityService extends IService<PackageCity, PackageCityCreateDto, PackageCityUpdateDto> {
  // Add custom service methods here
}
