import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { TravelMode, TravelModeCreateDto, TravelModeUpdateDto } from '@/modules/travels/entities/travelmode.entity';
import { ITravelModeRepository } from '@/modules/travels/repositories/interfaces/travelmode.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class TravelModeRepository extends BaseRepository<TravelMode, TravelModeCreateDto, TravelModeUpdateDto> implements ITravelModeRepository {
  constructor() {
    super(prisma, 'TravelMode');
  }

  // Add custom repository methods here

}
