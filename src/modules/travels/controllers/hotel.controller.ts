import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { IHotelService } from '@/modules/travels/services/interfaces/hotel.service.interface';
import { Hotel, HotelCreateDto, HotelUpdateDto } from '@/modules/travels/entities/hotel.entity';
import { HotelResponse } from '../dtos/hotel-response.dto';
import { hotelValidation } from '@/modules/travels/validations/hotel.validation';

@injectable()
export class HotelController extends BaseController<Hotel, HotelCreateDto, HotelUpdateDto> {
  constructor(
    @inject('IHotelService') private hotelService: IHotelService
  ) {
    super({
      service: hotelService,
      responseClass: HotelResponse,
      createSchema: hotelValidation.create,
      updateSchema: hotelValidation.update,
      searchFields: ['name'], // Search by hotel name
      defaultInclude: {}, // Add default include, can be customized
    });
  }
}
