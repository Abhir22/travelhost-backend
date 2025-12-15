import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { IPackageService } from '@/modules/packages/services/interfaces/package.service.interface';
import { Package, PackageCreateDto, PackageUpdateDto } from '@/modules/packages/entities/package.entity';
import { PackageResponse } from '../dtos/package-response.dto';
import { packageValidation } from '@/modules/packages/validations/package.validation';

@injectable()
export class PackageController extends BaseController<Package, PackageCreateDto, PackageUpdateDto> {
  constructor(
    @inject('IPackageService') private packageService: IPackageService
  ) {
    super({
      service: packageService,
      responseClass: PackageResponse,
      createSchema: packageValidation.create,
      updateSchema: packageValidation.update,
      searchFields: ['packageName', 'description'], // Search by package name and description
      defaultInclude: {
        packagecategorymappings: {
          include: {
            category: true
          }
        },
        packageactivitymappings: {
          include: {
            activity: true
          }
        },
        packagesnapshotmappings: {
          include: {
            snapshot: true
          }
        }
      },
    });
  }
}
