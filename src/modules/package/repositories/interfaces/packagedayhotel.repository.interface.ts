import { IRepository } from '@/core/interfaces/repository.interface';
import { PackageDayHotel, PackageDayHotelCreateDto, PackageDayHotelUpdateDto } from '@/modules/package/entities/packagedayhotel.entity';

export interface IPackageDayHotelRepository extends IRepository<PackageDayHotel, PackageDayHotelCreateDto, PackageDayHotelUpdateDto> {
  // Add custom repository methods here
}
