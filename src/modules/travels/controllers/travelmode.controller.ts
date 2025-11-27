import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { ITravelModeService } from '@/modules/travels/services/interfaces/travelmode.service.interface';
import { TravelMode, TravelModeCreateDto, TravelModeUpdateDto } from '@/modules/travels/entities/travelmode.entity';
import { TravelModeResponse } from '../dtos/travelmode-response.dto';
import { travelmodeValidation } from '@/modules/travels/validations/travelmode.validation';

@injectable()
export class TravelModeController extends BaseController<TravelMode, TravelModeCreateDto, TravelModeUpdateDto> {
  constructor(
    @inject('ITravelModeService') private travelmodeService: ITravelModeService
  ) {
    super({
      service: travelmodeService,
      responseClass: TravelModeResponse,
      createSchema: travelmodeValidation.create,
      updateSchema: travelmodeValidation.update,
      searchFields: ['name'], // Search by travel mode name
      defaultInclude: {}, // Add default include, can be customized
    });
  }
}
