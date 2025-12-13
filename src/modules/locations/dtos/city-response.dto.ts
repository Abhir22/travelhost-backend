
import moment from 'moment';
import { City } from '@/modules/locations/entities/city.entity';

export class CityResponse {
  id?: string;
  name: string;
  countryId: string;
  stateId?: string | null;
  createdAt?: string;
  updatedAt?: string;

  constructor(city: City) {
    if ('id' in city && city.id) this.id = city.id;
    this.name = city.name;
    this.countryId = city.countryId;
    this.stateId = city.stateId;
    if ('createdAt' in city && city.createdAt) this.createdAt = moment(city.createdAt).format('YYYY-MM-DD');
    if ('updatedAt' in city && city.updatedAt) this.updatedAt = moment(city.updatedAt).format('YYYY-MM-DD');
  }
}
