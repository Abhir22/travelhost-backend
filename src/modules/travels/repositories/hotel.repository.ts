import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { Hotel, HotelCreateDto, HotelUpdateDto } from '@/modules/travels/entities/hotel.entity';
import { IHotelRepository } from '@/modules/travels/repositories/interfaces/hotel.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class HotelRepository extends BaseRepository<Hotel, HotelCreateDto, HotelUpdateDto> implements IHotelRepository {
  constructor() {
    super(prisma, 'Hotel');
  }

  // Add custom repository methods here

}
