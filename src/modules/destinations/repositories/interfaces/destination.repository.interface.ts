import { IRepository } from '@/core/interfaces/repository.interface';
import { Destination, DestinationCreateDto, DestinationUpdateDto } from '@/modules/destinations/entities/destination.entity';

export interface IDestinationRepository extends IRepository<Destination, DestinationCreateDto, DestinationUpdateDto> {
  createWithRelations(data: DestinationCreateDto): Promise<Destination>;
  updateWithRelations(id: string, data: DestinationUpdateDto): Promise<Destination>;
}
