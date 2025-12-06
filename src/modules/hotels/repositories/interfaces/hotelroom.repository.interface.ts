import { IRepository } from '@/core/interfaces/repository.interface';
import { HotelRoom, HotelRoomCreateDto, HotelRoomUpdateDto } from '@/modules/hotels/entities/hotelroom.entity';

export interface IHotelRoomRepository extends IRepository<HotelRoom, HotelRoomCreateDto, HotelRoomUpdateDto> {
  // Add custom repository methods here
}
