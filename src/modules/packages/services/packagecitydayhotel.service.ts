import { inject, injectable } from 'tsyringe';
import { PackageCityDayHotel, PackageCityDayHotelCreateDto, PackageCityDayHotelUpdateDto } from '@/modules/packages/entities/packagecitydayhotel.entity';
import { BaseService } from '@/core/base/base.service';
import { IPackageCityDayHotelService } from '@/modules/packages/services/interfaces/packagecitydayhotel.service.interface';
import { NotFoundException, BadRequestException } from '@/core/exceptions/http.exception';

@injectable()
export class PackageCityDayHotelService extends BaseService<PackageCityDayHotel, PackageCityDayHotelCreateDto, PackageCityDayHotelUpdateDto> implements IPackageCityDayHotelService {
  constructor(
    @inject('IPackageCityDayHotelRepository') repository: any
  ) {
    super(repository);
  }
}
