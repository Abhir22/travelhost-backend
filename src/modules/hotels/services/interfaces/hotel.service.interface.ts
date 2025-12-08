import { IService } from '@/core/interfaces/service.interface';
import { Hotel, HotelCreateDto, HotelUpdateDto } from '@/modules/hotels/entities/hotel.entity';

export interface IHotelService extends IService<Hotel, HotelCreateDto, HotelUpdateDto> {
  // Add custom service methods here
}
