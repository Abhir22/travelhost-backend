import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { RoomType, RoomTypeCreateDto, RoomTypeUpdateDto } from '@/modules/hotels/entities/roomtype.entity';
import { IRoomTypeRepository } from '@/modules/hotels/repositories/interfaces/roomtype.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class RoomTypeRepository extends BaseRepository<RoomType, RoomTypeCreateDto, RoomTypeUpdateDto> implements IRoomTypeRepository {
  constructor() {
    super(prisma, 'RoomType');
  }

  // Add custom repository methods here

}
