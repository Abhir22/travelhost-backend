import { IService } from '@/core/interfaces/service.interface';
import { PackageDaySightseeing, PackageDaySightseeingCreateDto, PackageDaySightseeingUpdateDto } from '@/modules/package/entities/packagedaysightseeing.entity';

export interface IPackageDaySightseeingService extends IService<PackageDaySightseeing, PackageDaySightseeingCreateDto, PackageDaySightseeingUpdateDto> {
  // Add custom service methods here
}
