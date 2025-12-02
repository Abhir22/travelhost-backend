import { IRepository } from '@/core/interfaces/repository.interface';
import { Destination, DestinationCreateDto, DestinationUpdateDto } from '@/modules/destinations/entities/destination.entity';

export interface IDestinationRepository extends IRepository<Destination, DestinationCreateDto, DestinationUpdateDto> {
  // Add custom repository methods here
}
