import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { IRoomTypeService } from '@/modules/hotels/services/interfaces/roomtype.service.interface';
import { RoomType, RoomTypeCreateDto, RoomTypeUpdateDto } from '@/modules/hotels/entities/roomtype.entity';
import { RoomTypeResponse } from '../dtos/roomtype-response.dto';
import { roomtypeValidation } from '@/modules/hotels/validations/roomtype.validation';

@injectable()
export class RoomTypeController extends BaseController<RoomType, RoomTypeCreateDto, RoomTypeUpdateDto> {
  constructor(
    @inject('IRoomTypeService') private roomtypeService: IRoomTypeService
  ) {
    super({
      service: roomtypeService,
      responseClass: RoomTypeResponse,
      createSchema: roomtypeValidation.create,
      updateSchema: roomtypeValidation.update,
      searchFields: ['id'], // Add default search fields, can be customized
      defaultInclude: {}, // Add default include, can be customized
    });
  }
}
