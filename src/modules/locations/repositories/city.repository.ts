import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { City, CityCreateDto, CityUpdateDto } from '@/modules/locations/entities/city.entity';
import { ICityRepository } from '@/modules/locations/repositories/interfaces/city.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class CityRepository extends BaseRepository<City, CityCreateDto, CityUpdateDto> implements ICityRepository {
  constructor() {
    super(prisma, 'City');
  }

  // Add custom repository methods here

}
