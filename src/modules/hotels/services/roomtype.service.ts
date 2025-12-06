import { inject, injectable } from 'tsyringe';
import { RoomType, RoomTypeCreateDto, RoomTypeUpdateDto } from '@/modules/hotels/entities/roomtype.entity';
import { BaseService } from '@/core/base/base.service';
import { IRoomTypeService } from '@/modules/hotels/services/interfaces/roomtype.service.interface';
import { NotFoundException, BadRequestException } from '@/core/exceptions/http.exception';

@injectable()
export class RoomTypeService extends BaseService<RoomType, RoomTypeCreateDto, RoomTypeUpdateDto> implements IRoomTypeService {
  constructor(
    @inject('IRoomTypeRepository') repository: any
  ) {
    super(repository);
  }
}
