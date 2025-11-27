import { IRepository } from '@/core/interfaces/repository.interface';
import { Sightseeing, SightseeingCreateDto, SightseeingUpdateDto } from '@/modules/locations/entities/sightseeing.entity';

export interface ISightseeingRepository extends IRepository<Sightseeing, SightseeingCreateDto, SightseeingUpdateDto> {
  // Add custom repository methods here
}
