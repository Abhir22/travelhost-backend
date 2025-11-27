import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { ICityService } from '@/modules/locations/services/interfaces/city.service.interface';
import { City, CityCreateDto, CityUpdateDto } from '@/modules/locations/entities/city.entity';
import { CityResponse } from '../dtos/city-response.dto';
import { cityValidation } from '@/modules/locations/validations/city.validation';

@injectable()
export class CityController extends BaseController<City, CityCreateDto, CityUpdateDto> {
  constructor(
    @inject('ICityService') private cityService: ICityService
  ) {
    super({
      service: cityService,
      responseClass: CityResponse,
      createSchema: cityValidation.create,
      updateSchema: cityValidation.update,
      searchFields: ['name'], // Search by city name
      defaultInclude: {}, // Add default include, can be customized
    });
  }
}
