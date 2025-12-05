import { IService } from '@/core/interfaces/service.interface';
import { PackageDay, PackageDayCreateDto, PackageDayUpdateDto } from '@/modules/package/entities/packageday.entity';

export interface IPackageDayService extends IService<PackageDay, PackageDayCreateDto, PackageDayUpdateDto> {
  // Add custom service methods here
}
