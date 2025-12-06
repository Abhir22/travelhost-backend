import { IService } from '@/core/interfaces/service.interface';
import { PackageCityDaySightseeing, PackageCityDaySightseeingCreateDto, PackageCityDaySightseeingUpdateDto } from '@/modules/packages/entities/packagecitydaysightseeing.entity';

export interface IPackageCityDaySightseeingService extends IService<PackageCityDaySightseeing, PackageCityDaySightseeingCreateDto, PackageCityDaySightseeingUpdateDto> {
  // Add custom service methods here
}
