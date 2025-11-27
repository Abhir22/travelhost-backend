import { inject, injectable } from 'tsyringe';
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
}
