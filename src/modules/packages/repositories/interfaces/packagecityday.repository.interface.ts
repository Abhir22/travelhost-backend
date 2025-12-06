import { IRepository } from '@/core/interfaces/repository.interface';
import { PackageCityDay, PackageCityDayCreateDto, PackageCityDayUpdateDto } from '@/modules/packages/entities/packagecityday.entity';

export interface IPackageCityDayRepository extends IRepository<PackageCityDay, PackageCityDayCreateDto, PackageCityDayUpdateDto> {
  // Add custom repository methods here
}
