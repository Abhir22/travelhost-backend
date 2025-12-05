import { IService } from '@/core/interfaces/service.interface';
import { PackageDayHotel, PackageDayHotelCreateDto, PackageDayHotelUpdateDto } from '@/modules/package/entities/packagedayhotel.entity';

export interface IPackageDayHotelService extends IService<PackageDayHotel, PackageDayHotelCreateDto, PackageDayHotelUpdateDto> {
  // Add custom service methods here
}
