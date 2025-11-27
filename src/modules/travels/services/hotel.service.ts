import { inject, injectable } from 'tsyringe';
import { Hotel, HotelCreateDto, HotelUpdateDto } from '@/modules/travels/entities/hotel.entity';
import { BaseService } from '@/core/base/base.service';
import { IHotelService } from '@/modules/travels/services/interfaces/hotel.service.interface';
import { NotFoundException, BadRequestException } from '@/core/exceptions/http.exception';

@injectable()
export class HotelService extends BaseService<Hotel, HotelCreateDto, HotelUpdateDto> implements IHotelService {
  constructor(
    @inject('IHotelRepository') repository: any
  ) {
    super(repository);
  }
}
