import { IRepository } from '@/core/interfaces/repository.interface';
import { PackageCityDayTravel, PackageCityDayTravelCreateDto, PackageCityDayTravelUpdateDto } from '@/modules/packages/entities/packagecitydaytravel.entity';

export interface IPackageCityDayTravelRepository extends IRepository<PackageCityDayTravel, PackageCityDayTravelCreateDto, PackageCityDayTravelUpdateDto> {
  // Add custom repository methods here
}
