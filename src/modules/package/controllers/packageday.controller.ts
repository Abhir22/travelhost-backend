import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { BaseController } from '@/core/base/base.controller';
import { IPackageDayService } from '@/modules/package/services/interfaces/packageday.service.interface';
import { PackageDay, PackageDayCreateDto, PackageDayUpdateDto } from '@/modules/package/entities/packageday.entity';
import { PackageDayResponse } from '../dtos/packageday-response.dto';
import { packagedayValidation } from '@/modules/package/validations/packageday.validation';
import { asyncHandler } from '@/core/middlewares/error.middleware';
import { SuccessResponse } from '@/core/utils/api-response';

@injectable()
export class PackageDayController extends BaseController<PackageDay, PackageDayCreateDto, PackageDayUpdateDto> {
  constructor(
    @inject('IPackageDayService') private packagedayService: IPackageDayService
  ) {
    super({
      service: packagedayService,
      responseClass: PackageDayResponse,
      createSchema: packagedayValidation.create,
      updateSchema: packagedayValidation.update,
      searchFields: ['id'],
      defaultInclude: {},
    });
  }

  /**
   * 2️⃣ Add Package Days - POST /packages/:packageId/days
   * Adds multiple days to a package
   */
  addPackageDays = asyncHandler(async (req: Request, res: Response) => {
    const { packageId } = req.params;
    const { days } = req.body; // Array of { dayNumber: number }
    const created = await this.packagedayService.addPackageDays(packageId, days);
    return SuccessResponse.create(created).send(res);
  });
}
