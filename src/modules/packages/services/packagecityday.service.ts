import { inject, injectable } from 'tsyringe';
import { PackageCityDay, PackageCityDayCreateDto, PackageCityDayUpdateDto } from '@/modules/packages/entities/packagecityday.entity';
import { BaseService } from '@/core/base/base.service';
import { IPackageCityDayService } from '@/modules/packages/services/interfaces/packagecityday.service.interface';
import { NotFoundException, BadRequestException } from '@/core/exceptions/http.exception';

@injectable()
export class PackageCityDayService extends BaseService<PackageCityDay, PackageCityDayCreateDto, PackageCityDayUpdateDto> implements IPackageCityDayService {
  constructor(
    @inject('IPackageCityDayRepository') repository: any
  ) {
    super(repository);
  }
}
