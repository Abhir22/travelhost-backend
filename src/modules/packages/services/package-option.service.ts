import { inject, injectable } from 'tsyringe';
import { BaseService } from '@/core/base/base.service';
import { PackageOption, PackageOptionCreateDto, PackageOptionUpdateDto } from '@/modules/packages/entities/package-option.entity';
import { IPackageOptionRepository } from '@/modules/packages/repositories/interfaces/package-option.repository.interface';
import { IPackageOptionService } from './interfaces/package-option.service.interface';

@injectable()
export class PackageOptionService extends BaseService<PackageOption, PackageOptionCreateDto, PackageOptionUpdateDto> implements IPackageOptionService {
    constructor(
        @inject('IPackageOptionRepository') repository: IPackageOptionRepository
    ) {
        super(repository);
    }
}
