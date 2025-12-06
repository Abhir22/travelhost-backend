import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { IPackageSnapshotService } from '@/modules/packages/services/interfaces/packagesnapshot.service.interface';
import { PackageSnapshot, PackageSnapshotCreateDto, PackageSnapshotUpdateDto } from '@/modules/packages/entities/packagesnapshot.entity';
import { PackageSnapshotResponse } from '../dtos/packagesnapshot-response.dto';
import { packagesnapshotValidation } from '@/modules/packages/validations/packagesnapshot.validation';

@injectable()
export class PackageSnapshotController extends BaseController<PackageSnapshot, PackageSnapshotCreateDto, PackageSnapshotUpdateDto> {
  constructor(
    @inject('IPackageSnapshotService') private packagesnapshotService: IPackageSnapshotService
  ) {
    super({
      service: packagesnapshotService,
      responseClass: PackageSnapshotResponse,
      createSchema: packagesnapshotValidation.create,
      updateSchema: packagesnapshotValidation.update,
      searchFields: ['name'], // Search by snapshot name
      defaultInclude: {}, // Add default include, can be customized
    });
  }
}
