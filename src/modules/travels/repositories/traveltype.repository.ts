import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { TravelType, TravelTypeCreateDto, TravelTypeUpdateDto } from '@/modules/travels/entities/traveltype.entity';
import { ITravelTypeRepository } from '@/modules/travels/repositories/interfaces/traveltype.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class TravelTypeRepository extends BaseRepository<TravelType, TravelTypeCreateDto, TravelTypeUpdateDto> implements ITravelTypeRepository {
  constructor() {
    super(prisma, 'TravelType');
  }

  // Add custom repository methods here

}
