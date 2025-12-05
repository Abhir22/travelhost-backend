import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { BaseController } from '@/core/base/base.controller';
import { IPackageDayTravelTypeService } from '@/modules/package/services/interfaces/packagedaytraveltype.service.interface';
import { PackageDayTravelType, PackageDayTravelTypeCreateDto, PackageDayTravelTypeUpdateDto } from '@/modules/package/entities/packagedaytraveltype.entity';
import { PackageDayTravelTypeResponse } from '../dtos/packagedaytraveltype-response.dto';
import { packagedaytraveltypeValidation } from '@/modules/package/validations/packagedaytraveltype.validation';
import { asyncHandler } from '@/core/middlewares/error.middleware';
import { SuccessResponse } from '@/core/utils/api-response';

@injectable()
export class PackageDayTravelTypeController extends BaseController<PackageDayTravelType, PackageDayTravelTypeCreateDto, PackageDayTravelTypeUpdateDto> {
  constructor(
    @inject('IPackageDayTravelTypeService') private packagedaytraveltypeService: IPackageDayTravelTypeService
  ) {
    super({
      service: packagedaytraveltypeService,
      responseClass: PackageDayTravelTypeResponse,
      createSchema: packagedaytraveltypeValidation.create,
      updateSchema: packagedaytraveltypeValidation.update,
      searchFields: ['id'],
      defaultInclude: {},
    });
  }

  /**
   * 3️⃣ Add Travel Type for a Day - POST /package-days/:packageDayId/travel-types
   * Saves travel type for a package day
   */
  addTravelType = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const created = await this.packagedaytraveltypeService.addTravelType(data);
    return SuccessResponse.create(created).send(res);
  });
}
