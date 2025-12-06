import { inject, injectable } from 'tsyringe';
import { PackageSnapshot, PackageSnapshotCreateDto, PackageSnapshotUpdateDto } from '@/modules/packages/entities/packagesnapshot.entity';
import { BaseService } from '@/core/base/base.service';
import { IPackageSnapshotService } from '@/modules/packages/services/interfaces/packagesnapshot.service.interface';
import { NotFoundException, BadRequestException } from '@/core/exceptions/http.exception';

@injectable()
export class PackageSnapshotService extends BaseService<PackageSnapshot, PackageSnapshotCreateDto, PackageSnapshotUpdateDto> implements IPackageSnapshotService {
  constructor(
    @inject('IPackageSnapshotRepository') repository: any
  ) {
    super(repository);
  }
}
