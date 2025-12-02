import { inject, injectable } from 'tsyringe';
import { Destination, DestinationCreateDto, DestinationUpdateDto } from '@/modules/destinations/entities/destination.entity';
import { BaseService } from '@/core/base/base.service';
import { IDestinationService } from '@/modules/destinations/services/interfaces/destination.service.interface';
import { NotFoundException, BadRequestException } from '@/core/exceptions/http.exception';

@injectable()
export class DestinationService extends BaseService<Destination, DestinationCreateDto, DestinationUpdateDto> implements IDestinationService {
  constructor(
    @inject('IDestinationRepository') repository: any
  ) {
    super(repository);
  }
}
