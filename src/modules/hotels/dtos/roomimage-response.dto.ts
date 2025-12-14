import moment from 'moment';
import { RoomImage } from "../entities/roomimage.entity";
import { HotelRoomResponse } from "./hotelroom-response.dto";


export class RoomImageResponse {
  id?: string;
  hotelRoomId: string;
  imageUrl: string;
  hotelRoom?: HotelRoomResponse;
  createdAt?: string;
  updatedAt?: string;

  constructor(roomimage: RoomImage) {
    if ('id' in roomimage && roomimage.id) this.id = roomimage.id;
    this.hotelRoomId = roomimage.hotelRoomId;
    this.imageUrl = roomimage.imageUrl;
    this.hotelRoom = roomimage.hotelRoom && typeof roomimage.hotelRoom === 'object' ? new HotelRoomResponse({ ...(roomimage.hotelRoom as any) }) : undefined;
    if ('createdAt' in roomimage && roomimage.createdAt) this.createdAt = moment(roomimage.createdAt).format('DD-MM-YYYY');
    if ('updatedAt' in roomimage && roomimage.updatedAt) this.updatedAt = moment(roomimage.updatedAt).format('DD-MM-YYYY');
  }
}
