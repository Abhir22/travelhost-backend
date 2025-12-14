import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { PackageExclusion, PackageExclusionCreateDto, PackageExclusionUpdateDto } from '@/modules/packages/entities/package-exclusion.entity';
import { IPackageExclusionService } from '@/modules/packages/services/interfaces/package-exclusion.service.interface';
import { PackageExclusionResponse } from '@/modules/packages/dtos/package-exclusion-response.dto';
import { packageExclusionValidation } from '@/modules/packages/validations/package-exclusion.validation';

@injectable()
export class PackageExclusionController extends BaseController<PackageExclusion, PackageExclusionCreateDto, PackageExclusionUpdateDto> {
    constructor(
        @inject('IPackageExclusionService') service: IPackageExclusionService
    ) {
        super({
            service,
            responseClass: PackageExclusionResponse,
            createSchema: packageExclusionValidation.create,
            updateSchema: packageExclusionValidation.update,
            searchFields: ['content'],
        });
    }
}
