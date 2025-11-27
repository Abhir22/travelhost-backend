import { IService } from '@/core/interfaces/service.interface';
import { City, CityCreateDto, CityUpdateDto } from '@/modules/locations/entities/city.entity';

export interface ICityService extends IService<City, CityCreateDto, CityUpdateDto> {
  // Add custom service methods here
}
