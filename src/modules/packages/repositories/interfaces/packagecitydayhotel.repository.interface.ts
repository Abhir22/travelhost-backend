import { IRepository } from '@/core/interfaces/repository.interface';
import { PackageCityDayHotel, PackageCityDayHotelCreateDto, PackageCityDayHotelUpdateDto } from '@/modules/packages/entities/packagecitydayhotel.entity';

export interface IPackageCityDayHotelRepository extends IRepository<PackageCityDayHotel, PackageCityDayHotelCreateDto, PackageCityDayHotelUpdateDto> {
  // Add custom repository methods here
}
