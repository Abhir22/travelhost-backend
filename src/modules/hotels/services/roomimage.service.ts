import { inject, injectable } from 'tsyringe';
import { RoomImage, RoomImageCreateDto, RoomImageUpdateDto } from '@/modules/hotels/entities/roomimage.entity';
import { BaseService } from '@/core/base/base.service';
import { IRoomImageService } from '@/modules/hotels/services/interfaces/roomimage.service.interface';
import { NotFoundException, BadRequestException } from '@/core/exceptions/http.exception';

@injectable()
export class RoomImageService extends BaseService<RoomImage, RoomImageCreateDto, RoomImageUpdateDto> implements IRoomImageService {
  constructor(
    @inject('IRoomImageRepository') repository: any
  ) {
    super(repository);
  }
}
