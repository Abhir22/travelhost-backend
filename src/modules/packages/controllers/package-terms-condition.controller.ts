import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { PackageTermsCondition, PackageTermsConditionCreateDto, PackageTermsConditionUpdateDto } from '@/modules/packages/entities/package-terms-condition.entity';
import { IPackageTermsConditionService } from '@/modules/packages/services/interfaces/package-terms-condition.service.interface';
import { PackageTermsConditionResponse } from '@/modules/packages/dtos/package-terms-condition-response.dto';
import { packageTermsConditionValidation } from '@/modules/packages/validations/package-terms-condition.validation';

@injectable()
export class PackageTermsConditionController extends BaseController<PackageTermsCondition, PackageTermsConditionCreateDto, PackageTermsConditionUpdateDto> {
    constructor(
        @inject('IPackageTermsConditionService') service: IPackageTermsConditionService
    ) {
        super({
            service,
            responseClass: PackageTermsConditionResponse,
            createSchema: packageTermsConditionValidation.create,
            updateSchema: packageTermsConditionValidation.update,
            searchFields: ['content'],
        });
    }
}
