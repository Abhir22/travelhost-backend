import { inject, injectable } from 'tsyringe';
import { PackageActivity, PackageActivityCreateDto, PackageActivityUpdateDto } from '@/modules/package/entities/packageactivity.entity';
import { BaseService } from '@/core/base/base.service';
import { IPackageActivityService } from '@/modules/package/services/interfaces/packageactivity.service.interface';
import { NotFoundException, BadRequestException } from '@/core/exceptions/http.exception';

@injectable()
export class PackageActivityService extends BaseService<PackageActivity, PackageActivityCreateDto, PackageActivityUpdateDto> implements IPackageActivityService {
  constructor(
    @inject('IPackageActivityRepository') repository: any
  ) {
    super(repository);
  }
}
