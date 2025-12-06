import { IService } from '@/core/interfaces/service.interface';
import { RoomImage, RoomImageCreateDto, RoomImageUpdateDto } from '@/modules/hotels/entities/roomimage.entity';

export interface IRoomImageService extends IService<RoomImage, RoomImageCreateDto, RoomImageUpdateDto> {
  // Add custom service methods here
}
