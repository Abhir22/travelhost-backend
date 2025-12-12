import { HotelResponse } from "@/modules/hotels/dtos/hotel-response.dto";
import { HotelRoom } from "../entities/hotelroom.entity";
import { RoomImageResponse } from "./roomimage-response.dto";
import { RoomTypeResponse } from "./roomtype-response.dto";


export class HotelRoomResponse {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  hotelId: string;
  roomTypeId: string;
  roomNumber?: string;
  price?: number;
  amenities?: string[];
  description?: any;
  hotel?: HotelResponse;
  roomType?: RoomTypeResponse;
  roomimages?: RoomImageResponse[];

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
    if ('id' in hotelroom) this.id = hotelroom.id;
    if ('createdAt' in hotelroom) this.createdAt = hotelroom.createdAt;
    if ('updatedAt' in hotelroom) this.updatedAt = hotelroom.updatedAt;
    this.hotelId = hotelroom.hotelId!;
    this.roomTypeId = hotelroom.roomTypeId!;
    this.roomNumber = hotelroom.roomNumber || undefined;
    this.price = hotelroom.price ? Number(hotelroom.price) : undefined;
    this.amenities = hotelroom.amenities ? this.parseAmenities(hotelroom.amenities) : undefined;
    this.description = hotelroom.description || undefined;
    this.hotel = hotelroom.hotel && typeof hotelroom.hotel === 'object' ? new HotelResponse({ ...(hotelroom.hotel as any) }) : undefined;
    this.roomType = hotelroom.roomType && typeof hotelroom.roomType === 'object' ? new RoomTypeResponse({ ...(hotelroom.roomType as any) }) : undefined;
    this.roomimages = Array.isArray(hotelroom.roomImages) ? hotelroom.roomImages.map((r: any) => new RoomImageResponse({ ...(r as any) })) : [];
  }
}
