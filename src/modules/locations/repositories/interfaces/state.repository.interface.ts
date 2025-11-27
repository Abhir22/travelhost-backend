import { IRepository } from '@/core/interfaces/repository.interface';
import { State, StateCreateDto, StateUpdateDto } from '@/modules/locations/entities/state.entity';

export interface IStateRepository extends IRepository<State, StateCreateDto, StateUpdateDto> {
  // Add custom repository methods here
}
