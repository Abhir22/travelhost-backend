import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { ICountryService } from '@/modules/locations/services/interfaces/country.service.interface';
import { Country, CountryCreateDto, CountryUpdateDto } from '@/modules/locations/entities/country.entity';
import { CountryResponse } from '../dtos/country-response.dto';
import { countryValidation } from '@/modules/locations/validations/country.validation';

@injectable()
export class CountryController extends BaseController<Country, CountryCreateDto, CountryUpdateDto> {
  constructor(
    @inject('ICountryService') private countryService: ICountryService
  ) {
    super({
      service: countryService,
      responseClass: CountryResponse,
      createSchema: countryValidation.create,
      updateSchema: countryValidation.update,
      searchFields: ['name'], // Search by country name
      defaultInclude: {}, // Add default include, can be customized
    });
  }
}
