import { inject, injectable } from 'tsyringe';
import { PackageActivity, PackageActivityCreateDto, PackageActivityUpdateDto } from '@/modules/packages/entities/packageactivity.entity';
import { BaseService } from '@/core/base/base.service';
import { IPackageActivityService } from '@/modules/packages/services/interfaces/packageactivity.service.interface';
import { NotFoundException, BadRequestException } from '@/core/exceptions/http.exception';

@injectable()
export class PackageActivityService extends BaseService<PackageActivity, PackageActivityCreateDto, PackageActivityUpdateDto> implements IPackageActivityService {
  constructor(
    @inject('IPackageActivityRepository') repository: any
  ) {
    super(repository);
  }
}
