
import { Hotel } from '@/modules/travels/entities/hotel.entity';

export class HotelResponse {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  countryId: string;
  stateId: string;
  cityId: string;
  sightseeingId?: string;
  name: string;

  constructor(hotel: Hotel) {
    if ('id' in hotel) this.id = hotel.id;
    if ('createdAt' in hotel) this.createdAt = hotel.createdAt;
    if ('updatedAt' in hotel) this.updatedAt = hotel.updatedAt;
    this.countryId = hotel.countryId;
    this.stateId = hotel.stateId;
    this.cityId = hotel.cityId;
    this.sightseeingId = hotel.sightseeingId || undefined;
    this.name = hotel.name;
  }
}
