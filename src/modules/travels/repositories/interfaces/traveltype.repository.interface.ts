import { IRepository } from '@/core/interfaces/repository.interface';
import { TravelType, TravelTypeCreateDto, TravelTypeUpdateDto } from '@/modules/travels/entities/traveltype.entity';

export interface ITravelTypeRepository extends IRepository<TravelType, TravelTypeCreateDto, TravelTypeUpdateDto> {
  // Add custom repository methods here
}
