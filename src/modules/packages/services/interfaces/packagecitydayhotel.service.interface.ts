import { IService } from '@/core/interfaces/service.interface';
import { PackageCityDayHotel, PackageCityDayHotelCreateDto, PackageCityDayHotelUpdateDto } from '@/modules/packages/entities/packagecitydayhotel.entity';

export interface IPackageCityDayHotelService extends IService<PackageCityDayHotel, PackageCityDayHotelCreateDto, PackageCityDayHotelUpdateDto> {
  // Add custom service methods here
}
