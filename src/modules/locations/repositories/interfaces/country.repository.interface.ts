import { IRepository } from '@/core/interfaces/repository.interface';
import { Country, CountryCreateDto, CountryUpdateDto } from '@/modules/locations/entities/country.entity';

export interface ICountryRepository extends IRepository<Country, CountryCreateDto, CountryUpdateDto> {
  // Add custom repository methods here
}
