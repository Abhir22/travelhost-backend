import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { BaseController } from '@/core/base/base.controller';
import { IPackageService } from '@/modules/package/services/interfaces/package.service.interface';
import { Package, PackageCreateDto, PackageUpdateDto } from '@/modules/package/entities/package.entity';
import { PackageResponse } from '../dtos/package-response.dto';
import { packageValidation } from '@/modules/package/validations/package.validation';
import { asyncHandler } from '@/core/middlewares/error.middleware';
import { SuccessResponse } from '@/core/utils/api-response';

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
      searchFields: ['id'],
      defaultInclude: {},
    });
  }

  /**
   * 1️⃣ Create Package - POST /packages
   * Validates packageTypeId, requires countryId for international packages
   */
  createPackage = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const created = await this.packageService.createPackage(data);
    return SuccessResponse.create(created).send(res);
  });

  /**
   * 6️⃣ Get Full Package with Day-wise Details - GET /packages/:id/full
   * Returns package with nested days, travel types, sightseeing, and hotels
   */
  getFullPackage = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const fullPackage = await this.packageService.getFullPackage(id);
    return SuccessResponse.get(fullPackage).send(res);
  });

  /**
   * 7️⃣ Delete Package - DELETE /packages/:id
   * Cascades delete to all related days and activities
   */
  deletePackage = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.packageService.deletePackage(id);
    return SuccessResponse.delete({ id, deleted: true }).send(res);
  });

  /**
   * 8️⃣ Update Package - PUT /packages/:id
   * Updates main package table only
   */
  updatePackage = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    const updated = await this.packageService.updatePackage(id, data);
    return SuccessResponse.update(updated).send(res);
  });

  /**
   * 9️⃣ Create Full Package - POST /packages/full
   * Creates package with all days and activities in one request
   */
  createFullPackage = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const created = await this.packageService.createFullPackage(data);
    return SuccessResponse.create(created).send(res);
  });
}
