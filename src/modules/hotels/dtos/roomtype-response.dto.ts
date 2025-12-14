import moment from 'moment';
import { RoomType } from "../entities/roomtype.entity";
import { HotelRoomResponse } from "./hotelroom-response.dto";


export class RoomTypeResponse {
  id?: string;
  name: string;
  description?: any;
  hotelrooms?: HotelRoomResponse[];
  createdAt?: string;
  updatedAt?: string;

  constructor(roomtype: Partial<RoomType>) {
    if ('id' in roomtype && roomtype.id) this.id = roomtype.id;
    this.name = roomtype.name!;
    this.description = roomtype.description || undefined;
    this.hotelrooms = 'hotelRooms' in roomtype && Array.isArray(roomtype.hotelRooms) ? roomtype.hotelRooms.map((r: any) => new HotelRoomResponse({ ...(r as any) })) : [];
    if ('createdAt' in roomtype && roomtype.createdAt) this.createdAt = moment(roomtype.createdAt).format('DD-MM-YYYY');
    if ('updatedAt' in roomtype && roomtype.updatedAt) this.updatedAt = moment(roomtype.updatedAt).format('DD-MM-YYYY');
  }
}
