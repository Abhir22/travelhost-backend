import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { asyncHandler } from '@/core/middlewares/error.middleware';
import { SuccessResponse } from '@/core/utils/api-response';
import { BaseController } from '@/core/base/base.controller';
import { ValidationUtil } from '@/core/utils/validate-and-transform';
import { BadRequestException } from '@/core/exceptions/http.exception';
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
    try {
      // Parse JSON data - handle both multipart/form-data and direct JSON body
      let packageData;
      try {
        if (req.body.packageData) {
          // Multipart form-data: packageData is a JSON string field
          packageData = typeof req.body.packageData === 'string'
            ? JSON.parse(req.body.packageData)
            : req.body.packageData;
        } else if (req.body.packageName) {
          // Direct JSON body: the entire body is the package data
          packageData = req.body;
        } else {
          throw new Error('No package data provided');
        }
      } catch (parseError: any) {
        throw new BadRequestException(
          `Invalid request format. For multipart/form-data, send JSON as 'packageData' field. ` +
          `For JSON body, send the package object directly. Error: ${parseError.message}`
        );
      }

      // Validate request body
      const validatedData = ValidationUtil.validate(packageData, packageCompleteValidation.createComplete);

      // Get uploaded images from multer
      const images = req.files as Express.Multer.File[] || [];

      // Create complete package with images
      const createdPackage = await this.packageCompleteService.createCompletePackage({
        packageData: validatedData,
        images
      });

      // Send success response
      return SuccessResponse.create(
        createdPackage,
        `Package created successfully with ${createdPackage.uploadedImages || 0} images uploaded`
      ).send(res);

    } catch (error: any) {
      // Handle specific errors
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new BadRequestException(`Failed to create package: ${error.message}`);
    }
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

  uploadPackageImages = asyncHandler(async (req: Request, res: Response) => {
    const { packageId } = req.params;
    const images = req.files as Express.Multer.File[] || [];

    if (!images || images.length === 0) {
      throw new BadRequestException('No images provided');
    }

    // Check if package exists
    const existingPackage = await this.packageService.findById(packageId);
    if (!existingPackage) {
      throw new BadRequestException('Package not found');
    }

    // Upload images and create gallery records
    const result = await this.packageCompleteService.uploadPackageImages(packageId, images);

    return SuccessResponse.create(
      result,
      `${result.uploadedCount} images uploaded successfully`
    ).send(res);
  });
}