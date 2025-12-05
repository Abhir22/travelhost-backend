import { inject, injectable } from 'tsyringe';
import { PackageDay, PackageDayCreateDto, PackageDayUpdateDto } from '@/modules/package/entities/packageday.entity';
import { BaseService } from '@/core/base/base.service';
import { IPackageDayService } from '@/modules/package/services/interfaces/packageday.service.interface';
import { NotFoundException, BadRequestException } from '@/core/exceptions/http.exception';
import { IPackageRepository } from '@/modules/package/repositories/interfaces/package.repository.interface';

@injectable()
export class PackageDayService extends BaseService<PackageDay, PackageDayCreateDto, PackageDayUpdateDto> implements IPackageDayService {
  constructor(
    @inject('IPackageDayRepository') repository: any,
    @inject('IPackageRepository') private packageRepository: IPackageRepository
  ) {
    super(repository);
  }

  /**
   * 2️⃣ Add Package Days
   * DB Operations:
   * - Ensure packageId exists in Package table
   * - Insert multiple rows into PackageDay table with dayNumber
   * - Return the created days
   */
  async addPackageDays(packageId: string, days: { dayNumber: number }[]): Promise<PackageDay[]> {
    // Ensure packageId exists
    const pkg = await this.packageRepository.findById(packageId);
    if (!pkg) {
      throw new NotFoundException('Package not found');
    }

    // Insert multiple rows into PackageDay table
    const createdDays: PackageDay[] = [];
    for (const day of days) {
      const created = await this.repository.create({
        packageId,
        dayNumber: day.dayNumber
      });
      createdDays.push(created);
    }

    return createdDays;
  }
}
