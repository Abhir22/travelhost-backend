import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { State, StateCreateDto, StateUpdateDto } from '@/modules/locations/entities/state.entity';
import { IStateRepository } from '@/modules/locations/repositories/interfaces/state.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class StateRepository extends BaseRepository<State, StateCreateDto, StateUpdateDto> implements IStateRepository {
  constructor() {
    super(prisma, 'State');
  }

  // Add custom repository methods here

}
