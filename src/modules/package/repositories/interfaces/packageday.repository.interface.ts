import { IRepository } from '@/core/interfaces/repository.interface';
import { PackageDay, PackageDayCreateDto, PackageDayUpdateDto } from '@/modules/package/entities/packageday.entity';

export interface IPackageDayRepository extends IRepository<PackageDay, PackageDayCreateDto, PackageDayUpdateDto> {
  // Add custom repository methods here
}
