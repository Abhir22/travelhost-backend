
import moment from 'moment';
import { State } from '@/modules/locations/entities/state.entity';

export class StateResponse {
  id?: string;
  name: string;
  countryId: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(state: State) {
    if ('id' in state && state.id) this.id = state.id;
    this.name = state.name;
    this.countryId = state.countryId;
    if ('createdAt' in state && state.createdAt) this.createdAt = moment(state.createdAt).format('YYYY-MM-DD');
    if ('updatedAt' in state && state.updatedAt) this.updatedAt = moment(state.updatedAt).format('YYYY-MM-DD');
  }
}
