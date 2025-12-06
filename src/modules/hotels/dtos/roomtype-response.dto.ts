import { RoomType } from "../entities/roomtype.entity";
import { HotelRoomResponse } from "./hotelroom-response.dto";


export class RoomTypeResponse {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  description?: any;
  hotelrooms?: HotelRoomResponse[];

  constructor(roomtype: Partial<RoomType>) {
    if ('id' in roomtype) this.id = roomtype.id;
    if ('createdAt' in roomtype) this.createdAt = roomtype.createdAt;
    if ('updatedAt' in roomtype) this.updatedAt = roomtype.updatedAt;
    this.name = roomtype.name!;
    this.description = roomtype.description || undefined;
    this.hotelrooms = 'hotelRooms' in roomtype && Array.isArray(roomtype.hotelRooms) ? roomtype.hotelRooms.map((r: any) => new HotelRoomResponse({ ...(r as any) })) : [];
  }
}
