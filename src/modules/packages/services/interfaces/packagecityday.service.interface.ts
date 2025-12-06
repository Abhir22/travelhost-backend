import { IService } from '@/core/interfaces/service.interface';
import { PackageCityDay, PackageCityDayCreateDto, PackageCityDayUpdateDto } from '@/modules/packages/entities/packagecityday.entity';

export interface IPackageCityDayService extends IService<PackageCityDay, PackageCityDayCreateDto, PackageCityDayUpdateDto> {
  // Add custom service methods here
}
