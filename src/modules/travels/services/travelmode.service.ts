import { inject, injectable } from 'tsyringe';
import { TravelMode, TravelModeCreateDto, TravelModeUpdateDto } from '@/modules/travels/entities/travelmode.entity';
import { BaseService } from '@/core/base/base.service';
import { ITravelModeService } from '@/modules/travels/services/interfaces/travelmode.service.interface';
import { NotFoundException, BadRequestException } from '@/core/exceptions/http.exception';

@injectable()
export class TravelModeService extends BaseService<TravelMode, TravelModeCreateDto, TravelModeUpdateDto> implements ITravelModeService {
  constructor(
    @inject('ITravelModeRepository') repository: any
  ) {
    super(repository);
  }
}
