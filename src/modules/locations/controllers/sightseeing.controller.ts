import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { ISightseeingService } from '@/modules/locations/services/interfaces/sightseeing.service.interface';
import { Sightseeing, SightseeingCreateDto, SightseeingUpdateDto } from '@/modules/locations/entities/sightseeing.entity';
import { SightseeingResponse } from '../dtos/sightseeing-response.dto';
import { sightseeingValidation } from '@/modules/locations/validations/sightseeing.validation';

@injectable()
export class SightseeingController extends BaseController<Sightseeing, SightseeingCreateDto, SightseeingUpdateDto> {
  constructor(
    @inject('ISightseeingService') private sightseeingService: ISightseeingService
  ) {
    super({
      service: sightseeingService,
      responseClass: SightseeingResponse,
      createSchema: sightseeingValidation.create,
      updateSchema: sightseeingValidation.update,
      searchFields: ['name', 'city.name'], // Search by sightseeing name and city name
      defaultInclude: {
        city: {
          include: {
            country: true,
            state: true
          }
        }
      }, // Include city with country and state for proper filtering and response
    });
  }
}
