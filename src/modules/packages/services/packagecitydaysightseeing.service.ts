import { inject, injectable } from 'tsyringe';
import { PackageCityDaySightseeing, PackageCityDaySightseeingCreateDto, PackageCityDaySightseeingUpdateDto } from '@/modules/packages/entities/packagecitydaysightseeing.entity';
import { BaseService } from '@/core/base/base.service';
import { IPackageCityDaySightseeingService } from '@/modules/packages/services/interfaces/packagecitydaysightseeing.service.interface';
import { NotFoundException, BadRequestException } from '@/core/exceptions/http.exception';

@injectable()
export class PackageCityDaySightseeingService extends BaseService<PackageCityDaySightseeing, PackageCityDaySightseeingCreateDto, PackageCityDaySightseeingUpdateDto> implements IPackageCityDaySightseeingService {
  constructor(
    @inject('IPackageCityDaySightseeingRepository') repository: any
  ) {
    super(repository);
  }
}
