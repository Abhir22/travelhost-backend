import { container } from 'tsyringe';
import { IRoomTypeService } from './services/interfaces/roomtype.service.interface';
import { RoomTypeService } from './services/roomtype.service';
import { IRoomTypeRepository } from './repositories/interfaces/roomtype.repository.interface';
import { RoomTypeRepository } from './repositories/roomtype.repository';
import { IHotelRoomService } from './services/interfaces/hotelroom.service.interface';
import { HotelRoomService } from './services/hotelroom.service';
import { IHotelRoomRepository } from './repositories/interfaces/hotelroom.repository.interface';
import { HotelRoomRepository } from './repositories/hotelroom.repository';
import { IRoomImageService } from './services/interfaces/roomimage.service.interface';
import { RoomImageService } from './services/roomimage.service';
import { IRoomImageRepository } from './repositories/interfaces/roomimage.repository.interface';
import { RoomImageRepository } from './repositories/roomimage.repository';
import { HotelRepository } from './repositories/hotel.repository';
import { IHotelRepository } from './repositories/interfaces/hotel.repository.interface';
import { HotelService } from './services/hotel.service';
import { IHotelService } from './services/interfaces/hotel.service.interface';

export const registerDependencies = () => {
    container.register<IHotelService>('IHotelService', { useClass: HotelService });
    container.register<IHotelRepository>('IHotelRepository', { useClass: HotelRepository });
  container.register<IRoomTypeService>('IRoomTypeService', { useClass: RoomTypeService });
  container.register<IRoomTypeRepository>('IRoomTypeRepository', { useClass: RoomTypeRepository });
  container.register<IHotelRoomService>('IHotelRoomService', { useClass: HotelRoomService });
  container.register<IHotelRoomRepository>('IHotelRoomRepository', { useClass: HotelRoomRepository });
  container.register<IRoomImageService>('IRoomImageService', { useClass: RoomImageService });
  container.register<IRoomImageRepository>('IRoomImageRepository', { useClass: RoomImageRepository });
  console.log('All module dependencies registered');
};

export const clearDependencies = () => {
  container.reset();
};
