import { inject, injectable } from 'tsyringe';
import { PackageCategoryMapping, PackageCategoryMappingCreateDto, PackageCategoryMappingUpdateDto } from '@/modules/packages/entities/packagecategorymapping.entity';
import { BaseService } from '@/core/base/base.service';
import { IPackageCategoryMappingService } from '@/modules/packages/services/interfaces/packagecategorymapping.service.interface';
import { NotFoundException, BadRequestException } from '@/core/exceptions/http.exception';

@injectable()
export class PackageCategoryMappingService extends BaseService<PackageCategoryMapping, PackageCategoryMappingCreateDto, PackageCategoryMappingUpdateDto> implements IPackageCategoryMappingService {
  constructor(
    @inject('IPackageCategoryMappingRepository') repository: any
  ) {
    super(repository);
  }
}
