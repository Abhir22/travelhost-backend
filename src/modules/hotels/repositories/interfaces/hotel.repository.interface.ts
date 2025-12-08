import { IRepository } from '@/core/interfaces/repository.interface';
import { Hotel, HotelCreateDto, HotelUpdateDto } from '@/modules/hotels/entities/hotel.entity';

export interface IHotelRepository extends IRepository<Hotel, HotelCreateDto, HotelUpdateDto> {
  // Add custom repository methods here
}
