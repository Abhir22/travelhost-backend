import { container } from 'tsyringe';
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
import { HotelTypeRepository } from './repositories/hoteltype.repository';
import { IHotelTypeRepository } from './repositories/interfaces/hoteltype.repository.interface';
import { HotelTypeService } from './services/hoteltype.service';
import { IHotelTypeService } from './services/interfaces/hoteltype.service.interface';


export const registerDependencies = () => {
    container.register<IHotelService>('IHotelService', { useClass: HotelService });
    container.register<IHotelRepository>('IHotelRepository', { useClass: HotelRepository });
  container.register<IHotelTypeService>('IHotelTypeService', { useClass: HotelTypeService });
  container.register<IHotelTypeRepository>('IHotelTypeRepository', { useClass: HotelTypeRepository });
  container.register<IHotelRoomService>('IHotelRoomService', { useClass: HotelRoomService });
  container.register<IHotelRoomRepository>('IHotelRoomRepository', { useClass: HotelRoomRepository });
  container.register<IRoomImageService>('IRoomImageService', { useClass: RoomImageService });
  container.register<IRoomImageRepository>('IRoomImageRepository', { useClass: RoomImageRepository });
  console.log('All module dependencies registered');
};

export const clearDependencies = () => {
  container.reset();
};
