import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { asyncHandler } from '@/core/middlewares/error.middleware';
import { RequestOptionBuilder } from '@/core/utils/request-option-builder';
import { BaseResponse } from '@/core/base/response/base.response';
import { SuccessResponse } from '@/core/utils/api-response';
import { BaseController } from '@/core/base/base.controller';
import { ICityService } from '@/modules/locations/services/interfaces/city.service.interface';
import { City, CityCreateDto, CityUpdateDto } from '@/modules/locations/entities/city.entity';
import { CityResponse } from '../dtos/city-response.dto';
import { cityValidation } from '@/modules/locations/validations/city.validation';

@injectable()
export class CityController extends BaseController<City, CityCreateDto, CityUpdateDto> {
  constructor(
    @inject('ICityService') private cityService: ICityService
  ) {
    super({
      service: cityService,
      responseClass: CityResponse,
      createSchema: cityValidation.create,
      updateSchema: cityValidation.update,
      searchFields: ['name'], // Search by city name
      defaultInclude: {}, // Add default include, can be customized
    });
  }

  getAll = asyncHandler(async (req: Request, res: Response) => {
    const options = RequestOptionBuilder.buildFindOptions(req, this.querySchemas);
    const { countryId, countryName } = req.query;

    if (countryId) {
      options.where = { ...options.where, countryId: String(countryId) };
    }

    if (countryName) {
      options.where = {
        ...options.where,
        country: {
          name: String(countryName)
        }
      };
    }

    if (!options.include) {
      options.include = { country: true, state: true };
    }

    const records = await this.service.findAll(options);
    const responseData = BaseResponse.mapMany(records, this.responseClass);
    return SuccessResponse.get(responseData).send(res);
  });
}
