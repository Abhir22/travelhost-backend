import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { BaseController } from '@/core/base/base.controller';
import { IPackageDaySightseeingService } from '@/modules/package/services/interfaces/packagedaysightseeing.service.interface';
import { PackageDaySightseeing, PackageDaySightseeingCreateDto, PackageDaySightseeingUpdateDto } from '@/modules/package/entities/packagedaysightseeing.entity';
import { PackageDaySightseeingResponse } from '../dtos/packagedaysightseeing-response.dto';
import { packagedaysightseeingValidation } from '@/modules/package/validations/packagedaysightseeing.validation';
import { asyncHandler } from '@/core/middlewares/error.middleware';
import { SuccessResponse } from '@/core/utils/api-response';

@injectable()
export class PackageDaySightseeingController extends BaseController<PackageDaySightseeing, PackageDaySightseeingCreateDto, PackageDaySightseeingUpdateDto> {
  constructor(
    @inject('IPackageDaySightseeingService') private packagedaysightseeingService: IPackageDaySightseeingService
  ) {
    super({
      service: packagedaysightseeingService,
      responseClass: PackageDaySightseeingResponse,
      createSchema: packagedaysightseeingValidation.create,
      updateSchema: packagedaysightseeingValidation.update,
      searchFields: ['id'],
      defaultInclude: {},
    });
  }

  /**
   * 4️⃣ Add Sightseeing for a Day - POST /package-days/:packageDayId/sightseeing
   * Stores sightseeing for a package day
   */
  addSightseeing = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const created = await this.packagedaysightseeingService.addSightseeing(data);
    return SuccessResponse.create(created).send(res);
  });
}
