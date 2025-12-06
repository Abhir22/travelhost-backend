import { IRepository } from '@/core/interfaces/repository.interface';
import { PackageCity, PackageCityCreateDto, PackageCityUpdateDto } from '@/modules/packages/entities/packagecity.entity';

export interface IPackageCityRepository extends IRepository<PackageCity, PackageCityCreateDto, PackageCityUpdateDto> {
  // Add custom repository methods here
}
