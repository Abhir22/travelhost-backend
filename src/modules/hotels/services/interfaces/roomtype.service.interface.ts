import { IService } from '@/core/interfaces/service.interface';
import { RoomType, RoomTypeCreateDto, RoomTypeUpdateDto } from '@/modules/hotels/entities/roomtype.entity';

export interface IRoomTypeService extends IService<RoomType, RoomTypeCreateDto, RoomTypeUpdateDto> {
  // Add custom service methods here
}
