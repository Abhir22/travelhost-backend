import { IService } from '@/core/interfaces/service.interface';
import { PackageCityDayTravel, PackageCityDayTravelCreateDto, PackageCityDayTravelUpdateDto } from '@/modules/packages/entities/packagecitydaytravel.entity';

export interface IPackageCityDayTravelService extends IService<PackageCityDayTravel, PackageCityDayTravelCreateDto, PackageCityDayTravelUpdateDto> {
  // Add custom service methods here
}
