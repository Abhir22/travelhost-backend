import { IRepository } from '@/core/interfaces/repository.interface';
import { PackageDayTravelType, PackageDayTravelTypeCreateDto, PackageDayTravelTypeUpdateDto } from '@/modules/package/entities/packagedaytraveltype.entity';

export interface IPackageDayTravelTypeRepository extends IRepository<PackageDayTravelType, PackageDayTravelTypeCreateDto, PackageDayTravelTypeUpdateDto> {
  // Add custom repository methods here
}
