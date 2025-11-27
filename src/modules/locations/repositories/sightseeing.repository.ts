import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { Sightseeing, SightseeingCreateDto, SightseeingUpdateDto } from '@/modules/locations/entities/sightseeing.entity';
import { ISightseeingRepository } from '@/modules/locations/repositories/interfaces/sightseeing.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class SightseeingRepository extends BaseRepository<Sightseeing, SightseeingCreateDto, SightseeingUpdateDto> implements ISightseeingRepository {
  constructor() {
    super(prisma, 'Sightseeing');
  }

  // Add custom repository methods here

}
