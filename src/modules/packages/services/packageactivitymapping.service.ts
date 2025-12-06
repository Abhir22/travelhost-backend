import { inject, injectable } from 'tsyringe';
import { PackageActivityMapping, PackageActivityMappingCreateDto, PackageActivityMappingUpdateDto } from '@/modules/packages/entities/packageactivitymapping.entity';
import { BaseService } from '@/core/base/base.service';
import { IPackageActivityMappingService } from '@/modules/packages/services/interfaces/packageactivitymapping.service.interface';
import { NotFoundException, BadRequestException } from '@/core/exceptions/http.exception';

@injectable()
export class PackageActivityMappingService extends BaseService<PackageActivityMapping, PackageActivityMappingCreateDto, PackageActivityMappingUpdateDto> implements IPackageActivityMappingService {
  constructor(
    @inject('IPackageActivityMappingRepository') repository: any
  ) {
    super(repository);
  }
}
