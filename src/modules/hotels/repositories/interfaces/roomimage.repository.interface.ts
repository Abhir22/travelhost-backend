import { IRepository } from '@/core/interfaces/repository.interface';
import { RoomImage, RoomImageCreateDto, RoomImageUpdateDto } from '@/modules/hotels/entities/roomimage.entity';

export interface IRoomImageRepository extends IRepository<RoomImage, RoomImageCreateDto, RoomImageUpdateDto> {
  // Add custom repository methods here
}
