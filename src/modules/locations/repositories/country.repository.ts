import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { Country, CountryCreateDto, CountryUpdateDto } from '@/modules/locations/entities/country.entity';
import { ICountryRepository } from '@/modules/locations/repositories/interfaces/country.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class CountryRepository extends BaseRepository<Country, CountryCreateDto, CountryUpdateDto> implements ICountryRepository {
  constructor() {
    super(prisma, 'Country');
  }

  // Add custom repository methods here

}
