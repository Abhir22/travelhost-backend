import { inject, injectable } from 'tsyringe';
import { PackageType, PackageTypeCreateDto, PackageTypeUpdateDto } from '@/modules/packages/entities/packagetype.entity';
import { BaseService } from '@/core/base/base.service';
import { IPackageTypeService } from '@/modules/packages/services/interfaces/packagetype.service.interface';
import { NotFoundException, BadRequestException } from '@/core/exceptions/http.exception';

@injectable()
export class PackageTypeService extends BaseService<PackageType, PackageTypeCreateDto, PackageTypeUpdateDto> implements IPackageTypeService {
  constructor(
    @inject('IPackageTypeRepository') repository: any
  ) {
    super(repository);
  }
}
