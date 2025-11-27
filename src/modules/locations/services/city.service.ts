import { inject, injectable } from 'tsyringe';
import { City, CityCreateDto, CityUpdateDto } from '@/modules/locations/entities/city.entity';
import { BaseService } from '@/core/base/base.service';
import { ICityService } from '@/modules/locations/services/interfaces/city.service.interface';
import { NotFoundException, BadRequestException } from '@/core/exceptions/http.exception';

@injectable()
export class CityService extends BaseService<City, CityCreateDto, CityUpdateDto> implements ICityService {
  constructor(
    @inject('ICityRepository') repository: any
  ) {
    super(repository);
  }
}
