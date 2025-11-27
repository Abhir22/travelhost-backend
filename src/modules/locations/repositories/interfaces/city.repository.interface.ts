import { IRepository } from '@/core/interfaces/repository.interface';
import { City, CityCreateDto, CityUpdateDto } from '@/modules/locations/entities/city.entity';

export interface ICityRepository extends IRepository<City, CityCreateDto, CityUpdateDto> {
  // Add custom repository methods here
}
