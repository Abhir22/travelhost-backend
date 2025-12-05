import { IService } from '@/core/interfaces/service.interface';
import { PackageDayTravelType, PackageDayTravelTypeCreateDto, PackageDayTravelTypeUpdateDto } from '@/modules/package/entities/packagedaytraveltype.entity';

export interface IPackageDayTravelTypeService extends IService<PackageDayTravelType, PackageDayTravelTypeCreateDto, PackageDayTravelTypeUpdateDto> {
  // Add custom service methods here
}
