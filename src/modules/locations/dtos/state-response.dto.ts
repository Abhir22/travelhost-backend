
import { State } from '@/modules/locations/entities/state.entity';

export class StateResponse {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  countryId: string;
  name: string;

  constructor(state: State) {
    if ('id' in state) this.id = state.id;
    if ('createdAt' in state) this.createdAt = state.createdAt;
    if ('updatedAt' in state) this.updatedAt = state.updatedAt;
    this.countryId = state.countryId;
    this.name = state.name;
  }
}
