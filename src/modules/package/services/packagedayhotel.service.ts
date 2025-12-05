import { inject, injectable } from 'tsyringe';
import { PackageDayHotel, PackageDayHotelCreateDto, PackageDayHotelUpdateDto } from '@/modules/package/entities/packagedayhotel.entity';
import { BaseService } from '@/core/base/base.service';
import { IPackageDayHotelService } from '@/modules/package/services/interfaces/packagedayhotel.service.interface';
import { NotFoundException, BadRequestException } from '@/core/exceptions/http.exception';
import { IPackageDayRepository } from '@/modules/package/repositories/interfaces/packageday.repository.interface';

@injectable()
export class PackageDayHotelService extends BaseService<PackageDayHotel, PackageDayHotelCreateDto, PackageDayHotelUpdateDto> implements IPackageDayHotelService {
  constructor(
    @inject('IPackageDayHotelRepository') repository: any,
    @inject('IPackageDayRepository') private packageDayRepository: IPackageDayRepository
  ) {
    super(repository);
  }

  /**
   * 5️⃣ Add Hotel for a Day
   * DB Operations:
   * - Ensure packageDayId exists in PackageDay table
   * - Insert into PackageDayHotel: hotelName, starRating, hotelType, checkInTime, checkOutTime, 
   *   roomType, numberOfRooms, actualCheckIn, actualCheckOut
   * - Return created hotel entry
   */
  async addHotel(data: PackageDayHotelCreateDto): Promise<PackageDayHotel> {
    // Ensure packageDayId exists
    const packageDay = await this.packageDayRepository.findById(data.packageDayId);
    if (!packageDay) {
      throw new NotFoundException('PackageDay not found');
    }

    // Insert into PackageDayHotel
    const created = await this.repository.create(data);
    return created;
  }
}
