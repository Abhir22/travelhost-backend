import moment from 'moment';
import { HotelResponse } from "@/modules/hotels/dtos/hotel-response.dto";
import { HotelRoom } from "../entities/hotelroom.entity";
import { RoomImageResponse } from "./roomimage-response.dto";


export class HotelRoomResponse {
  id?: string;
  hotelId: string;
  roomType: string;
  roomNumber?: string;
  price?: number;
  amenities?: string[];
  description?: any;
  hotel?: HotelResponse;
  roomimages?: RoomImageResponse[];
  createdAt?: string;
  updatedAt?: string;

  private parseAmenities(amenities: string): string[] {
    try {
      // Try to parse as JSON first
      return JSON.parse(amenities);
    } catch (error) {
      // If JSON parsing fails, treat as comma-separated string
      return amenities.split(',').map(item => item.trim()).filter(item => item.length > 0);
    }
  }

  constructor(hotelroom: Partial<HotelRoom>) {
    if ('id' in hotelroom && hotelroom.id) this.id = hotelroom.id;
    this.hotelId = hotelroom.hotelId!;
    this.roomType = hotelroom.roomType!;
    this.roomNumber = hotelroom.roomNumber || undefined;
    this.price = hotelroom.price ? Number(hotelroom.price) : undefined;
    this.amenities = hotelroom.amenities ? this.parseAmenities(hotelroom.amenities) : undefined;
    this.description = hotelroom.description || undefined;
    this.hotel = hotelroom.hotel && typeof hotelroom.hotel === 'object' ? new HotelResponse({ ...(hotelroom.hotel as any) }) : undefined;
    this.roomimages = Array.isArray(hotelroom.roomImages) ? hotelroom.roomImages.map((r: any) => new RoomImageResponse({ ...(r as any) })) : [];
    if ('createdAt' in hotelroom && hotelroom.createdAt) this.createdAt = moment(hotelroom.createdAt).format('DD-MM-YYYY');
    if ('updatedAt' in hotelroom && hotelroom.updatedAt) this.updatedAt = moment(hotelroom.updatedAt).format('DD-MM-YYYY');
  }
}
