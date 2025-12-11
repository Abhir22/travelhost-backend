import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { asyncHandler } from '@/core/middlewares/error.middleware';
import { RequestOptionBuilder } from '@/core/utils/request-option-builder';
import { BaseResponse } from '@/core/base/response/base.response';
import { SuccessResponse } from '@/core/utils/api-response';
import { BaseController } from '@/core/base/base.controller';
import { IStateService } from '@/modules/locations/services/interfaces/state.service.interface';
import { State, StateCreateDto, StateUpdateDto } from '@/modules/locations/entities/state.entity';
import { StateResponse } from '../dtos/state-response.dto';
import { stateValidation } from '@/modules/locations/validations/state.validation';

@injectable()
export class StateController extends BaseController<State, StateCreateDto, StateUpdateDto> {
  constructor(
    @inject('IStateService') private stateService: IStateService
  ) {
    super({
      service: stateService,
      responseClass: StateResponse,
      createSchema: stateValidation.create,
      updateSchema: stateValidation.update,
      searchFields: ['name'], // Search by state name
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
      options.include = { country: true };
    }

    const records = await this.service.findAll(options);
    const responseData = BaseResponse.mapMany(records, this.responseClass);
    return SuccessResponse.get(responseData).send(res);
  });
}
