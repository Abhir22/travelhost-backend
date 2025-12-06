import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { RoomImage, RoomImageCreateDto, RoomImageUpdateDto } from '@/modules/hotels/entities/roomimage.entity';
import { IRoomImageRepository } from '@/modules/hotels/repositories/interfaces/roomimage.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class RoomImageRepository extends BaseRepository<RoomImage, RoomImageCreateDto, RoomImageUpdateDto> implements IRoomImageRepository {
  constructor() {
    super(prisma, 'RoomImage');
  }

  // Add custom repository methods here

}
