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
      searchFields: ['destinationType'],
      defaultInclude: {
        destinationCountries: {
          include: {
            country: true
          }
        },
        destinationCities: {
          include: {
            city: {
              include: {
                country: true,
                state: true
              }
            }
          }
        },
        destinationPackages: {
          include: {
            package: true
          }
        },
        destinationPackageTypes: true
      },
    });
  }
}
