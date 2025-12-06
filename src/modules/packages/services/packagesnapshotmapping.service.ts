import { inject, injectable } from 'tsyringe';
import { PackageSnapshotMapping, PackageSnapshotMappingCreateDto, PackageSnapshotMappingUpdateDto } from '@/modules/packages/entities/packagesnapshotmapping.entity';
import { BaseService } from '@/core/base/base.service';
import { IPackageSnapshotMappingService } from '@/modules/packages/services/interfaces/packagesnapshotmapping.service.interface';
import { NotFoundException, BadRequestException } from '@/core/exceptions/http.exception';

@injectable()
export class PackageSnapshotMappingService extends BaseService<PackageSnapshotMapping, PackageSnapshotMappingCreateDto, PackageSnapshotMappingUpdateDto> implements IPackageSnapshotMappingService {
  constructor(
    @inject('IPackageSnapshotMappingRepository') repository: any
  ) {
    super(repository);
  }
}
