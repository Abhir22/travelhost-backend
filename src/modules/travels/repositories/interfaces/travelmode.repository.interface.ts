import { IRepository } from '@/core/interfaces/repository.interface';
import { TravelMode, TravelModeCreateDto, TravelModeUpdateDto } from '@/modules/travels/entities/travelmode.entity';

export interface ITravelModeRepository extends IRepository<TravelMode, TravelModeCreateDto, TravelModeUpdateDto> {
  // Add custom repository methods here
}
