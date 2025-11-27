import { inject, injectable } from 'tsyringe';
import { Country, CountryCreateDto, CountryUpdateDto } from '@/modules/locations/entities/country.entity';
import { BaseService } from '@/core/base/base.service';
import { ICountryService } from '@/modules/locations/services/interfaces/country.service.interface';
import { NotFoundException, BadRequestException } from '@/core/exceptions/http.exception';

@injectable()
export class CountryService extends BaseService<Country, CountryCreateDto, CountryUpdateDto> implements ICountryService {
  constructor(
    @inject('ICountryRepository') repository: any
  ) {
    super(repository);
  }
}
