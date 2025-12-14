import { IRepository } from '@/core/interfaces/repository.interface';
import { PackageTermsCondition, PackageTermsConditionCreateDto, PackageTermsConditionUpdateDto } from '../../entities/package-terms-condition.entity';

export interface IPackageTermsConditionRepository extends IRepository<PackageTermsCondition, PackageTermsConditionCreateDto, PackageTermsConditionUpdateDto> {
}
