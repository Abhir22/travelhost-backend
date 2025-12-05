import { inject, injectable } from 'tsyringe';
import { PackageDayTravelType, PackageDayTravelTypeCreateDto, PackageDayTravelTypeUpdateDto } from '@/modules/package/entities/packagedaytraveltype.entity';
import { BaseService } from '@/core/base/base.service';
import { IPackageDayTravelTypeService } from '@/modules/package/services/interfaces/packagedaytraveltype.service.interface';
import { NotFoundException, BadRequestException } from '@/core/exceptions/http.exception';
import { IPackageDayRepository } from '@/modules/package/repositories/interfaces/packageday.repository.interface';

@injectable()
export class PackageDayTravelTypeService extends BaseService<PackageDayTravelType, PackageDayTravelTypeCreateDto, PackageDayTravelTypeUpdateDto> implements IPackageDayTravelTypeService {
  constructor(
    @inject('IPackageDayTravelTypeRepository') repository: any,
    @inject('IPackageDayRepository') private packageDayRepository: IPackageDayRepository
  ) {
    super(repository);
  }

  /**
   * 3️⃣ Add Travel Type for a Day
   * DB Operations:
   * - Verify packageDayId exists in PackageDay table
   * - Insert into PackageDayTravelType: type, carpooling, vehicleType, timeFrom, timeTo, description
   * - Return created travel type
   */
  async addTravelType(data: PackageDayTravelTypeCreateDto): Promise<PackageDayTravelType> {
    // Verify packageDayId exists
    const packageDay = await this.packageDayRepository.findById(data.packageDayId);
    if (!packageDay) {
      throw new NotFoundException('PackageDay not found');
    }

    // Insert into PackageDayTravelType
    const created = await this.repository.create(data);
    return created;
  }
}
