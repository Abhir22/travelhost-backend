import { inject, injectable } from 'tsyringe';
import { Package, PackageCreateDto, PackageUpdateDto } from '@/modules/packages/entities/package.entity';
import { BaseService } from '@/core/base/base.service';
import { IPackageService } from '@/modules/packages/services/interfaces/package.service.interface';
import { NotFoundException, BadRequestException } from '@/core/exceptions/http.exception';

@injectable()
export class PackageService extends BaseService<Package, PackageCreateDto, PackageUpdateDto> implements IPackageService {
  constructor(
    @inject('IPackageRepository') repository: any
  ) {
    super(repository);
  }
}
