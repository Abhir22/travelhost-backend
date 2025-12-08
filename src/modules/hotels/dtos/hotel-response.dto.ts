
import { Hotel } from '@/modules/hotels/entities/hotel.entity';

export class HotelResponse {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  countryId: string;
  stateId: string;
  cityId: string;
  sightseeingId?: string;
  hotelTypeId?: string;
  rating?: number;
  name: string;

  constructor(hotel: Hotel) {
    if ('id' in hotel) this.id = hotel.id;
    if ('createdAt' in hotel) this.createdAt = hotel.createdAt;
    if ('updatedAt' in hotel) this.updatedAt = hotel.updatedAt;
    this.countryId = hotel.countryId;
    this.stateId = hotel.stateId;
    this.cityId = hotel.cityId;
    this.sightseeingId = hotel.sightseeingId || undefined;
    this.hotelTypeId = hotel.hotelTypeId || undefined;
    this.rating = hotel.rating || undefined;
    this.name = hotel.name;
  }
}
