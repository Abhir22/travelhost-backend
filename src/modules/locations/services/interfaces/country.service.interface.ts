import { IService } from '@/core/interfaces/service.interface';
import { Country, CountryCreateDto, CountryUpdateDto } from '@/modules/locations/entities/country.entity';

export interface ICountryService extends IService<Country, CountryCreateDto, CountryUpdateDto> {
  // Add custom service methods here
}
