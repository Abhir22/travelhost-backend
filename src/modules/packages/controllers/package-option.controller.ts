import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { PackageOption, PackageOptionCreateDto, PackageOptionUpdateDto } from '@/modules/packages/entities/package-option.entity';
import { IPackageOptionService } from '@/modules/packages/services/interfaces/package-option.service.interface';
import { PackageOptionResponse } from '@/modules/packages/dtos/package-option-response.dto';
import { packageOptionValidation } from '@/modules/packages/validations/package-option.validation';

@injectable()
export class PackageOptionController extends BaseController<PackageOption, PackageOptionCreateDto, PackageOptionUpdateDto> {
    constructor(
        @inject('IPackageOptionService') service: IPackageOptionService
    ) {
        super({
            service,
            responseClass: PackageOptionResponse,
            createSchema: packageOptionValidation.create,
            updateSchema: packageOptionValidation.update,
            searchFields: [],
        });
    }
}
