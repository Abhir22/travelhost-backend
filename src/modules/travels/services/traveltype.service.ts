import { inject, injectable } from 'tsyringe';
import { TravelType, TravelTypeCreateDto, TravelTypeUpdateDto } from '@/modules/travels/entities/traveltype.entity';
import { BaseService } from '@/core/base/base.service';
import { ITravelTypeService } from '@/modules/travels/services/interfaces/traveltype.service.interface';
import { NotFoundException, BadRequestException } from '@/core/exceptions/http.exception';

@injectable()
export class TravelTypeService extends BaseService<TravelType, TravelTypeCreateDto, TravelTypeUpdateDto> implements ITravelTypeService {
  constructor(
    @inject('ITravelTypeRepository') repository: any
  ) {
    super(repository);
  }
}
