import { IService } from '@/core/interfaces/service.interface';
import { Sightseeing, SightseeingCreateDto, SightseeingUpdateDto } from '@/modules/locations/entities/sightseeing.entity';

export interface ISightseeingService extends IService<Sightseeing, SightseeingCreateDto, SightseeingUpdateDto> {
  // Add custom service methods here
}
