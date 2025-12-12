import { Hotel } from '../entities/hotel.entity';
import { CityResponse } from '@/modules/locations/dtos/city-response.dto';
import { HotelTypeResponse } from './hoteltype-response.dto';

export class HotelResponse {
  id?: string;
  cityId?: string;
  hotelTypeId?: string;
  name?: string;
  rating?: number;
  thumbnail?: string;
  createdAt?: Date;
  updatedAt?: Date;
  city?: CityResponse;
  hotelType?: HotelTypeResponse;

  constructor(hotel: Partial<Hotel>) {
    this.id = hotel.id;
    this.cityId = hotel.cityId;
    this.hotelTypeId = hotel.hotelTypeId || undefined;
    this.name = hotel.name;
    this.rating = hotel.rating || undefined;
    this.thumbnail = hotel.thumbnail || undefined;
    this.createdAt = hotel.createdAt;
    this.updatedAt = hotel.updatedAt;
    this.city = hotel.city && typeof hotel.city === 'object' ? new CityResponse({ ...(hotel.city as any) }) : undefined;
    this.hotelType = hotel.hotelType && typeof hotel.hotelType === 'object' ? new HotelTypeResponse({ ...(hotel.hotelType as any) }) : undefined;
  }
}