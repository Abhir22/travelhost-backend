import { IService } from '@/core/interfaces/service.interface';
import { PackageTermsCondition, PackageTermsConditionCreateDto, PackageTermsConditionUpdateDto } from '../../entities/package-terms-condition.entity';

export interface IPackageTermsConditionService extends IService<PackageTermsCondition, PackageTermsConditionCreateDto, PackageTermsConditionUpdateDto> {
}
