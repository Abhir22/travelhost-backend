import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { IHotelRoomService } from '@/modules/hotels/services/interfaces/hotelroom.service.interface';
import { HotelRoom, HotelRoomCreateDto, HotelRoomUpdateDto } from '@/modules/hotels/entities/hotelroom.entity';
import { HotelRoomResponse } from '../dtos/hotelroom-response.dto';
import { hotelroomValidation } from '@/modules/hotels/validations/hotelroom.validation';

@injectable()
export class HotelRoomController extends BaseController<HotelRoom, HotelRoomCreateDto, HotelRoomUpdateDto> {
  constructor(
    @inject('IHotelRoomService') private hotelroomService: IHotelRoomService
  ) {
    super({
      service: hotelroomService,
      responseClass: HotelRoomResponse,
      createSchema: hotelroomValidation.create,
      updateSchema: hotelroomValidation.update,
      searchFields: ['id'], // Add default search fields, can be customized
      defaultInclude: {
        hotel: {
          include: {
            city: {
              include: {
                country: true,
                state: true
              }
            },
            hotelType: true
          }
        },
        roomType: true,
        roomImages: true
      },
    });
  }
}
