import { inject, injectable } from 'tsyringe';
import { Sightseeing, SightseeingCreateDto, SightseeingUpdateDto } from '@/modules/locations/entities/sightseeing.entity';
import { BaseService } from '@/core/base/base.service';
import { ISightseeingService } from '@/modules/locations/services/interfaces/sightseeing.service.interface';
import { NotFoundException, BadRequestException } from '@/core/exceptions/http.exception';

@injectable()
export class SightseeingService extends BaseService<Sightseeing, SightseeingCreateDto, SightseeingUpdateDto> implements ISightseeingService {
  constructor(
    @inject('ISightseeingRepository') repository: any
  ) {
    super(repository);
  }
}
