import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { Destination, DestinationCreateDto, DestinationUpdateDto } from '@/modules/destinations/entities/destination.entity';
import { IDestinationRepository } from '@/modules/destinations/repositories/interfaces/destination.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class DestinationRepository extends BaseRepository<Destination, DestinationCreateDto, DestinationUpdateDto> implements IDestinationRepository {
  constructor() {
    super(prisma, 'Destination');
  }

  private readonly defaultInclude = {
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
  };

  async createWithRelations(data: DestinationCreateDto): Promise<Destination> {
    const result = await this.model.create({
      data,
      include: this.defaultInclude
    });
    return result;
  }

  async updateWithRelations(id: string, data: DestinationUpdateDto): Promise<Destination> {
    const result = await this.model.update({
      where: { id },
      data,
      include: this.defaultInclude
    });
    return result;
  }

  async findById(id: string): Promise<Destination | null> {
    return this.model.findUnique({
      where: { id },
      include: this.defaultInclude
    });
  }

  async findAll(options?: any): Promise<Destination[]> {
    return this.model.findMany({
      ...options,
      include: this.defaultInclude
    });
  }
}
