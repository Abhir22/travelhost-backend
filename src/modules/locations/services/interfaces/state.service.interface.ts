import { IService } from '@/core/interfaces/service.interface';
import { State, StateCreateDto, StateUpdateDto } from '@/modules/locations/entities/state.entity';

export interface IStateService extends IService<State, StateCreateDto, StateUpdateDto> {
  // Add custom service methods here
}
