
import { City } from '@/modules/locations/entities/city.entity';

export class CityResponse {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  countryId: string;
  stateId?: string | null;
  name: string;

  constructor(city: City) {
    if ('id' in city) this.id = city.id;
    if ('createdAt' in city) this.createdAt = city.createdAt;
    if ('updatedAt' in city) this.updatedAt = city.updatedAt;
    this.countryId = city.countryId;
    this.stateId = city.stateId;
    this.name = city.name;
  }
}
