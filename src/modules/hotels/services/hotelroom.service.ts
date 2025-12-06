import { inject, injectable } from 'tsyringe';
import { HotelRoom, HotelRoomCreateDto, HotelRoomUpdateDto } from '@/modules/hotels/entities/hotelroom.entity';
import { BaseService } from '@/core/base/base.service';
import { IHotelRoomService } from '@/modules/hotels/services/interfaces/hotelroom.service.interface';
import { NotFoundException, BadRequestException } from '@/core/exceptions/http.exception';

@injectable()
export class HotelRoomService extends BaseService<HotelRoom, HotelRoomCreateDto, HotelRoomUpdateDto> implements IHotelRoomService {
  constructor(
    @inject('IHotelRoomRepository') repository: any
  ) {
    super(repository);
  }
}
