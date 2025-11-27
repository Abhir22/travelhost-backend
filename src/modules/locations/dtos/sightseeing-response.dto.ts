
import { Sightseeing } from '@/modules/locations/entities/sightseeing.entity';

export class SightseeingResponse {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  countryId?: string;
  stateId?: string;
  cityId?: string;
  name: string;

  constructor(sightseeing: Sightseeing) {
    if ('id' in sightseeing) this.id = sightseeing.id;
    if ('createdAt' in sightseeing) this.createdAt = sightseeing.createdAt;
    if ('updatedAt' in sightseeing) this.updatedAt = sightseeing.updatedAt;
    this.countryId = sightseeing.countryId || undefined;
    this.stateId = sightseeing.stateId || undefined;
    this.cityId = sightseeing.cityId || undefined;
    this.name = sightseeing.name;
  }
}
