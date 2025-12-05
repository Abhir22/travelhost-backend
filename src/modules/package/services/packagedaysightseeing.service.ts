import { inject, injectable } from 'tsyringe';
import { PackageDaySightseeing, PackageDaySightseeingCreateDto, PackageDaySightseeingUpdateDto } from '@/modules/package/entities/packagedaysightseeing.entity';
import { BaseService } from '@/core/base/base.service';
import { IPackageDaySightseeingService } from '@/modules/package/services/interfaces/packagedaysightseeing.service.interface';
import { NotFoundException, BadRequestException } from '@/core/exceptions/http.exception';
import { IPackageDayRepository } from '@/modules/package/repositories/interfaces/packageday.repository.interface';

@injectable()
export class PackageDaySightseeingService extends BaseService<PackageDaySightseeing, PackageDaySightseeingCreateDto, PackageDaySightseeingUpdateDto> implements IPackageDaySightseeingService {
  constructor(
    @inject('IPackageDaySightseeingRepository') repository: any,
    @inject('IPackageDayRepository') private packageDayRepository: IPackageDayRepository
  ) {
    super(repository);
  }

  /**
   * 4️⃣ Add Sightseeing for a Day
   * DB Operations:
   * - Verify packageDayId exists in PackageDay table
   * - Insert into PackageDaySightseeing: sightseeingName, ticket, timeFrom, timeTo
   * - Return inserted sightseeing row
   */
  async addSightseeing(data: PackageDaySightseeingCreateDto): Promise<PackageDaySightseeing> {
    // Verify packageDayId exists
    const packageDay = await this.packageDayRepository.findById(data.packageDayId);
    if (!packageDay) {
      throw new NotFoundException('PackageDay not found');
    }

    // Insert into PackageDaySightseeing
    const created = await this.repository.create(data);
    return created;
  }
}
