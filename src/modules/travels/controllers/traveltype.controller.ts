import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { ITravelTypeService } from '@/modules/travels/services/interfaces/traveltype.service.interface';
import { TravelType, TravelTypeCreateDto, TravelTypeUpdateDto } from '@/modules/travels/entities/traveltype.entity';
import { TravelTypeResponse } from '../dtos/traveltype-response.dto';
import { traveltypeValidation } from '@/modules/travels/validations/traveltype.validation';

@injectable()
export class TravelTypeController extends BaseController<TravelType, TravelTypeCreateDto, TravelTypeUpdateDto> {
  constructor(
    @inject('ITravelTypeService') private traveltypeService: ITravelTypeService
  ) {
    super({
      service: traveltypeService,
      responseClass: TravelTypeResponse,
      createSchema: traveltypeValidation.create,
      updateSchema: traveltypeValidation.update,
      searchFields: ['name'], // Search by travel type name
      defaultInclude: {}, // Add default include, can be customized
    });
  }
}
