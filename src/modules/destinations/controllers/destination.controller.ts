import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { IDestinationService } from '@/modules/destinations/services/interfaces/destination.service.interface';
import { Destination, DestinationCreateDto, DestinationUpdateDto } from '@/modules/destinations/entities/destination.entity';
import { DestinationResponse } from '../dtos/destination-response.dto';
import { destinationValidation } from '@/modules/destinations/validations/destination.validation';

@injectable()
export class DestinationController extends BaseController<Destination, DestinationCreateDto, DestinationUpdateDto> {
  constructor(
    @inject('IDestinationService') private destinationService: IDestinationService
  ) {
    super({
      service: destinationService,
      responseClass: DestinationResponse,
      createSchema: destinationValidation.create,
      updateSchema: destinationValidation.update,
      searchFields: ['name', 'destinationType', 'priceRange'], // Search by name, type, and price range
      defaultInclude: {}, // Add default include, can be customized
    });
  }
}
