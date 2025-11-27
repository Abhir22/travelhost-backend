
import { TravelMode } from '@/modules/travels/entities/travelmode.entity';

export class TravelModeResponse {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  countryId: string;
  stateId: string;
  cityId: string;
  sightseeingId?: string;
  travelTypeId?: string;
  name: string;

  constructor(travelmode: TravelMode) {
    if ('id' in travelmode) this.id = travelmode.id;
    if ('createdAt' in travelmode) this.createdAt = travelmode.createdAt;
    if ('updatedAt' in travelmode) this.updatedAt = travelmode.updatedAt;
    this.countryId = travelmode.countryId;
    this.stateId = travelmode.stateId;
    this.cityId = travelmode.cityId;
    this.sightseeingId = travelmode.sightseeingId || undefined;
    this.travelTypeId = travelmode.travelTypeId || undefined;
    this.name = travelmode.name;
  }
}
