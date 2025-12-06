import { inject, injectable } from 'tsyringe';
import { PackageCity, PackageCityCreateDto, PackageCityUpdateDto } from '@/modules/packages/entities/packagecity.entity';
import { BaseService } from '@/core/base/base.service';
import { IPackageCityService } from '@/modules/packages/services/interfaces/packagecity.service.interface';
import { NotFoundException, BadRequestException } from '@/core/exceptions/http.exception';

@injectable()
export class PackageCityService extends BaseService<PackageCity, PackageCityCreateDto, PackageCityUpdateDto> implements IPackageCityService {
  constructor(
    @inject('IPackageCityRepository') repository: any
  ) {
    super(repository);
  }
}
