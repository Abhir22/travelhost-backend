import { IService } from '@/core/interfaces/service.interface';
import { TravelMode, TravelModeCreateDto, TravelModeUpdateDto } from '@/modules/travels/entities/travelmode.entity';

export interface ITravelModeService extends IService<TravelMode, TravelModeCreateDto, TravelModeUpdateDto> {
  // Add custom service methods here
}
