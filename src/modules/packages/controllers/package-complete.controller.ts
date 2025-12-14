import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { asyncHandler } from '@/core/middlewares/error.middleware';
import { SuccessResponse } from '@/core/utils/api-response';
import { BaseController } from '@/core/base/base.controller';
import { ValidationUtil } from '@/core/utils/validate-and-transform';
import { IPackageService } from '@/modules/packages/services/interfaces/package.service.interface';
import { IPackageCompleteService } from '@/modules/packages/services/interfaces/package-complete.service.interface';
import { Package, PackageCreateDto, PackageUpdateDto } from '@/modules/packages/entities/package.entity';
import { PackageResponse } from '../dtos/package-response.dto';
import { packageValidation } from '@/modules/packages/validations/package.validation';
import { packageCompleteValidation } from '@/modules/packages/validations/package-create-complete.validation';

@injectable()
export class PackageCompleteController extends BaseController<Package, PackageCreateDto, PackageUpdateDto> {
  constructor(
    @inject('IPackageService') private packageService: IPackageService,
    @inject('IPackageCompleteService') private packageCompleteService: IPackageCompleteService
  ) {
    super({
      service: packageService,
      responseClass: PackageResponse,
      createSchema: packageValidation.create,
      updateSchema: packageValidation.update,
      searchFields: ['packageName', 'description'],
      defaultInclude: {},
    });
  }

  createCompletePackage = asyncHandler(async (req: Request, res: Response) => {
    // Validate request body
    const validatedData = ValidationUtil.validate(req.body, packageCompleteValidation.createComplete);
    
    // Create complete package
    const createdPackage = await this.packageCompleteService.createCompletePackage(validatedData);
    
    // Send success response with minimal data
    return SuccessResponse.create(createdPackage, 'Package created successfully with all related data').send(res);
  });

  getCompletePackage = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    // Get complete package with all relations
    const packageData = await this.packageCompleteService.getCompletePackage(id);
    
    // Transform response
    const response = new PackageResponse(packageData);
    
    // Send success response
    return SuccessResponse.get(response, 'Package retrieved successfully').send(res);
  });
}