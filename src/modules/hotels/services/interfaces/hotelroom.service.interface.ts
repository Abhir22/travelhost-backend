import { IService } from '@/core/interfaces/service.interface';
import { HotelRoom, HotelRoomCreateDto, HotelRoomUpdateDto } from '@/modules/hotels/entities/hotelroom.entity';

export interface IHotelRoomService extends IService<HotelRoom, HotelRoomCreateDto, HotelRoomUpdateDto> {
  // Add custom service methods here
}
