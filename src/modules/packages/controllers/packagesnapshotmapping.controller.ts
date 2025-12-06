import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { IPackageSnapshotMappingService } from '@/modules/packages/services/interfaces/packagesnapshotmapping.service.interface';
import { PackageSnapshotMapping, PackageSnapshotMappingCreateDto, PackageSnapshotMappingUpdateDto } from '@/modules/packages/entities/packagesnapshotmapping.entity';
import { PackageSnapshotMappingResponse } from '../dtos/packagesnapshotmapping-response.dto';
import { packagesnapshotmappingValidation } from '@/modules/packages/validations/packagesnapshotmapping.validation';

@injectable()
export class PackageSnapshotMappingController extends BaseController<PackageSnapshotMapping, PackageSnapshotMappingCreateDto, PackageSnapshotMappingUpdateDto> {
  constructor(
    @inject('IPackageSnapshotMappingService') private packagesnapshotmappingService: IPackageSnapshotMappingService
  ) {
    super({
      service: packagesnapshotmappingService,
      responseClass: PackageSnapshotMappingResponse,
      createSchema: packagesnapshotmappingValidation.create,
      updateSchema: packagesnapshotmappingValidation.update,
      searchFields: ['id'], // Add default search fields, can be customized
      defaultInclude: {}, // Add default include, can be customized
    });
  }
}
