import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { Destination, DestinationCreateDto, DestinationUpdateDto } from '@/modules/destinations/entities/destination.entity';
import { IDestinationRepository } from '@/modules/destinations/repositories/interfaces/destination.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class DestinationRepository extends BaseRepository<Destination, DestinationCreateDto, DestinationUpdateDto> implements IDestinationRepository {
  constructor() {
    super(prisma, 'Destination');
  }

  // Add custom repository methods here

}
