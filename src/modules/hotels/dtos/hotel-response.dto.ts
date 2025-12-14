import moment from 'moment';
import { Hotel } from '../entities/hotel.entity';
import { CityResponse } from '@/modules/locations/dtos/city-response.dto';
import { HotelTypeResponse } from './hoteltype-response.dto';

export class HotelResponse {
  id?: string;
  name?: string;
  cityId?: string;
  hotelTypeId?: string;
  rating?: number;
  thumbnail?: string;
  city?: CityResponse;
  hotelType?: HotelTypeResponse;
  createdAt?: string;
  updatedAt?: string;

  constructor(hotel: Partial<Hotel>) {
    if (hotel.id) this.id = hotel.id;
    this.name = hotel.name;
    this.cityId = hotel.cityId;
    this.hotelTypeId = hotel.hotelTypeId || undefined;
    this.rating = hotel.rating || undefined;
    this.thumbnail = hotel.thumbnail || undefined;
    this.city = hotel.city && typeof hotel.city === 'object' ? new CityResponse({ ...(hotel.city as any) }) : undefined;
    this.hotelType = hotel.hotelType && typeof hotel.hotelType === 'object' ? new HotelTypeResponse({ ...(hotel.hotelType as any) }) : undefined;
    if (hotel.createdAt) this.createdAt = moment(hotel.createdAt).format('DD-MM-YYYY');
    if (hotel.updatedAt) this.updatedAt = moment(hotel.updatedAt).format('DD-MM-YYYY');
  }
}
