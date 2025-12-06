import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { IRoomImageService } from '@/modules/hotels/services/interfaces/roomimage.service.interface';
import { RoomImage, RoomImageCreateDto, RoomImageUpdateDto } from '@/modules/hotels/entities/roomimage.entity';
import { RoomImageResponse } from '../dtos/roomimage-response.dto';
import { roomimageValidation } from '@/modules/hotels/validations/roomimage.validation';

@injectable()
export class RoomImageController extends BaseController<RoomImage, RoomImageCreateDto, RoomImageUpdateDto> {
  constructor(
    @inject('IRoomImageService') private roomimageService: IRoomImageService
  ) {
    super({
      service: roomimageService,
      responseClass: RoomImageResponse,
      createSchema: roomimageValidation.create,
      updateSchema: roomimageValidation.update,
      searchFields: ['id'], // Add default search fields, can be customized
      defaultInclude: {}, // Add default include, can be customized
    });
  }
}
