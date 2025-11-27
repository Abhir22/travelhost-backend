import { inject, injectable } from 'tsyringe';
import { State, StateCreateDto, StateUpdateDto } from '@/modules/locations/entities/state.entity';
import { BaseService } from '@/core/base/base.service';
import { IStateService } from '@/modules/locations/services/interfaces/state.service.interface';
import { NotFoundException, BadRequestException } from '@/core/exceptions/http.exception';

@injectable()
export class StateService extends BaseService<State, StateCreateDto, StateUpdateDto> implements IStateService {
  constructor(
    @inject('IStateRepository') repository: any
  ) {
    super(repository);
  }
}
