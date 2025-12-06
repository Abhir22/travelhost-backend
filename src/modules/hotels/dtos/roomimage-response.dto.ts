import { RoomImage } from "../entities/roomimage.entity";
import { HotelRoomResponse } from "./hotelroom-response.dto";


export class RoomImageResponse {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  hotelRoomId: string;
  imageUrl: string;
  hotelRoom?: HotelRoomResponse;

  constructor(roomimage: RoomImage) {
    if ('id' in roomimage) this.id = roomimage.id;
    if ('createdAt' in roomimage) this.createdAt = roomimage.createdAt;
    if ('updatedAt' in roomimage) this.updatedAt = roomimage.updatedAt;
    this.hotelRoomId = roomimage.hotelRoomId;
    this.imageUrl = roomimage.imageUrl;
    this.hotelRoom = roomimage.hotelRoom && typeof roomimage.hotelRoom === 'object' ? new HotelRoomResponse({ ...(roomimage.hotelRoom as any) }) : undefined;
  }
}
