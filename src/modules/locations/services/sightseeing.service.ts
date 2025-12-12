import { inject, injectable } from 'tsyringe';
import { Sightseeing, SightseeingCreateDto, SightseeingUpdateDto } from '@/modules/locations/entities/sightseeing.entity';
import { BaseService } from '@/core/base/base.service';
import { ISightseeingService } from '@/modules/locations/services/interfaces/sightseeing.service.interface';
import { NotFoundException, BadRequestException } from '@/core/exceptions/http.exception';
import { SearchOptions } from '@/core/interfaces/search-option.interface';
import { PaginatedResult } from '@/core/interfaces/paginated-result.interface';

@injectable()
export class SightseeingService extends BaseService<Sightseeing, SightseeingCreateDto, SightseeingUpdateDto> implements ISightseeingService {
  constructor(
    @inject('ISightseeingRepository') repository: any
  ) {
    super(repository);
  }

  async findWithPagination(options: SearchOptions): Promise<PaginatedResult<Sightseeing>> {
    // Handle countryId filtering through city relationship
    if (options.where && options.where.countryId) {
      const countryId = options.where.countryId;
      delete options.where.countryId;
      
      // Add nested where clause for city.countryId
      options.where = {
        ...options.where,
        city: {
          countryId: countryId
        }
      };
    }

    // Handle stateId filtering through city relationship
    if (options.where && options.where.stateId) {
      const stateId = options.where.stateId;
      delete options.where.stateId;
      
      // Add nested where clause for city.stateId
      options.where = {
        ...options.where,
        city: {
          ...options.where.city,
          stateId: stateId
        }
      };
    }

    return super.findWithPagination(options);
  }

  async findAll(options?: any): Promise<Sightseeing[]> {
    // Handle countryId filtering through city relationship
    if (options && options.where && options.where.countryId) {
      const countryId = options.where.countryId;
      delete options.where.countryId;
      
      // Add nested where clause for city.countryId
      options.where = {
        ...options.where,
        city: {
          countryId: countryId
        }
      };
    }

    // Handle stateId filtering through city relationship
    if (options && options.where && options.where.stateId) {
      const stateId = options.where.stateId;
      delete options.where.stateId;
      
      // Add nested where clause for city.stateId
      options.where = {
        ...options.where,
        city: {
          ...options.where.city,
          stateId: stateId
        }
      };
    }

    return super.findAll(options);
  }
}
