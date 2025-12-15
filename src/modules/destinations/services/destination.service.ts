import { inject, injectable } from 'tsyringe';
import { Destination, DestinationCreateDto, DestinationUpdateDto } from '@/modules/destinations/entities/destination.entity';
import { BaseService } from '@/core/base/base.service';
import { IDestinationService } from '@/modules/destinations/services/interfaces/destination.service.interface';
import { IDestinationRepository } from '@/modules/destinations/repositories/interfaces/destination.repository.interface';
import { NotFoundException, BadRequestException } from '@/core/exceptions/http.exception';

@injectable()
export class DestinationService extends BaseService<Destination, DestinationCreateDto, DestinationUpdateDto> implements IDestinationService {
  private destinationRepository: IDestinationRepository;

  constructor(
    @inject('IDestinationRepository') repository: IDestinationRepository
  ) {
    super(repository);
    this.destinationRepository = repository;
  }

  async create(data: DestinationCreateDto): Promise<Destination> {
    // Create destination with all nested relations
    const result = await this.destinationRepository.createWithRelations(data);
    return result;
  }

  async update(id: string, data: DestinationUpdateDto): Promise<Destination> {
    // Check if destination exists
    const existing = await this.destinationRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Destination with id ${id} not found`);
    }

    // Update destination with relations
    const result = await this.destinationRepository.updateWithRelations(id, data);
    return result;
  }
}
