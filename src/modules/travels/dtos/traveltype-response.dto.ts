
import { TravelType } from '@/modules/travels/entities/traveltype.entity';

export class TravelTypeResponse {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  cityId: string;
  sightseeingId?: string;
  name: string;
  hotelId?: string;

  constructor(traveltype: TravelType) {
    if ('id' in traveltype) this.id = traveltype.id;
    if ('createdAt' in traveltype) this.createdAt = traveltype.createdAt;
    if ('updatedAt' in traveltype) this.updatedAt = traveltype.updatedAt;
    this.cityId = traveltype.cityId;
    this.sightseeingId = traveltype.sightseeingId || undefined;
    this.name = traveltype.name;
    this.hotelId = traveltype.hotelId || undefined;
  }
}
