import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { BaseController } from '@/core/base/base.controller';
import { IPackageDayHotelService } from '@/modules/package/services/interfaces/packagedayhotel.service.interface';
import { PackageDayHotel, PackageDayHotelCreateDto, PackageDayHotelUpdateDto } from '@/modules/package/entities/packagedayhotel.entity';
import { PackageDayHotelResponse } from '../dtos/packagedayhotel-response.dto';
import { packagedayhotelValidation } from '@/modules/package/validations/packagedayhotel.validation';
import { asyncHandler } from '@/core/middlewares/error.middleware';
import { SuccessResponse } from '@/core/utils/api-response';

@injectable()
export class PackageDayHotelController extends BaseController<PackageDayHotel, PackageDayHotelCreateDto, PackageDayHotelUpdateDto> {
  constructor(
    @inject('IPackageDayHotelService') private packagedayhotelService: IPackageDayHotelService
  ) {
    super({
      service: packagedayhotelService,
      responseClass: PackageDayHotelResponse,
      createSchema: packagedayhotelValidation.create,
      updateSchema: packagedayhotelValidation.update,
      searchFields: ['id'],
      defaultInclude: {},
    });
  }

  /**
   * 5️⃣ Add Hotel for a Day - POST /package-days/:packageDayId/hotels
   * Adds hotel entry for a package day
   */
  addHotel = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const created = await this.packagedayhotelService.addHotel(data);
    return SuccessResponse.create(created).send(res);
  });
}
