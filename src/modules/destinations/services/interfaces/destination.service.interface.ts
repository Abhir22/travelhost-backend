import { IService } from '@/core/interfaces/service.interface';
import { Destination, DestinationCreateDto, DestinationUpdateDto } from '@/modules/destinations/entities/destination.entity';

export interface IDestinationService extends IService<Destination, DestinationCreateDto, DestinationUpdateDto> {
  // Add custom service methods here
}
