import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { PackageInclusion, PackageInclusionCreateDto, PackageInclusionUpdateDto } from '@/modules/packages/entities/package-inclusion.entity';
import { IPackageInclusionService } from '@/modules/packages/services/interfaces/package-inclusion.service.interface';
import { PackageInclusionResponse } from '@/modules/packages/dtos/package-inclusion-response.dto';
import { packageInclusionValidation } from '@/modules/packages/validations/package-inclusion.validation';

@injectable()
export class PackageInclusionController extends BaseController<PackageInclusion, PackageInclusionCreateDto, PackageInclusionUpdateDto> {
    constructor(
        @inject('IPackageInclusionService') service: IPackageInclusionService
    ) {
        super({
            service,
            responseClass: PackageInclusionResponse,
            createSchema: packageInclusionValidation.create,
            updateSchema: packageInclusionValidation.update,
            searchFields: ['content'],
        });
    }
}
