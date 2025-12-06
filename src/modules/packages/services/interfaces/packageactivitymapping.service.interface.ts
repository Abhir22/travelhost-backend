import { IService } from '@/core/interfaces/service.interface';
import { PackageActivityMapping, PackageActivityMappingCreateDto, PackageActivityMappingUpdateDto } from '@/modules/packages/entities/packageactivitymapping.entity';

export interface IPackageActivityMappingService extends IService<PackageActivityMapping, PackageActivityMappingCreateDto, PackageActivityMappingUpdateDto> {
  // Add custom service methods here
}
