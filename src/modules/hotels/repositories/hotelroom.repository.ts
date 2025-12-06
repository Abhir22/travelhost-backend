import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { HotelRoom, HotelRoomCreateDto, HotelRoomUpdateDto } from '@/modules/hotels/entities/hotelroom.entity';
import { IHotelRoomRepository } from '@/modules/hotels/repositories/interfaces/hotelroom.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class HotelRoomRepository extends BaseRepository<HotelRoom, HotelRoomCreateDto, HotelRoomUpdateDto> implements IHotelRoomRepository {
  constructor() {
    super(prisma, 'HotelRoom');
  }

  // Add custom repository methods here

}
