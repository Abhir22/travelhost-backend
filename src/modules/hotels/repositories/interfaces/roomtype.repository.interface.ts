import { IRepository } from '@/core/interfaces/repository.interface';
import { RoomType, RoomTypeCreateDto, RoomTypeUpdateDto } from '@/modules/hotels/entities/roomtype.entity';

export interface IRoomTypeRepository extends IRepository<RoomType, RoomTypeCreateDto, RoomTypeUpdateDto> {
  // Add custom repository methods here
}
