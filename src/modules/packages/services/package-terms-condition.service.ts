import { inject, injectable } from 'tsyringe';
import { BaseService } from '@/core/base/base.service';
import { PackageTermsCondition, PackageTermsConditionCreateDto, PackageTermsConditionUpdateDto } from '@/modules/packages/entities/package-terms-condition.entity';
import { IPackageTermsConditionRepository } from '@/modules/packages/repositories/interfaces/package-terms-condition.repository.interface';
import { IPackageTermsConditionService } from './interfaces/package-terms-condition.service.interface';

@injectable()
export class PackageTermsConditionService extends BaseService<PackageTermsCondition, PackageTermsConditionCreateDto, PackageTermsConditionUpdateDto> implements IPackageTermsConditionService {
    constructor(
        @inject('IPackageTermsConditionRepository') repository: IPackageTermsConditionRepository
    ) {
        super(repository);
    }
}
