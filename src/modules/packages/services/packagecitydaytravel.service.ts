import { inject, injectable } from 'tsyringe';
import { PackageCityDayTravel, PackageCityDayTravelCreateDto, PackageCityDayTravelUpdateDto } from '@/modules/packages/entities/packagecitydaytravel.entity';
import { BaseService } from '@/core/base/base.service';
import { IPackageCityDayTravelService } from '@/modules/packages/services/interfaces/packagecitydaytravel.service.interface';
import { NotFoundException, BadRequestException } from '@/core/exceptions/http.exception';

@injectable()
export class PackageCityDayTravelService extends BaseService<PackageCityDayTravel, PackageCityDayTravelCreateDto, PackageCityDayTravelUpdateDto> implements IPackageCityDayTravelService {
  constructor(
    @inject('IPackageCityDayTravelRepository') repository: any
  ) {
    super(repository);
  }
}
