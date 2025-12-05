import { inject, injectable } from 'tsyringe';
import { Package, PackageCreateDto, PackageUpdateDto } from '@/modules/package/entities/package.entity';
import { BaseService } from '@/core/base/base.service';
import { IPackageService } from '@/modules/package/services/interfaces/package.service.interface';
import { NotFoundException, BadRequestException } from '@/core/exceptions/http.exception';
import { IPackageTypeRepository } from '@/modules/package/repositories/interfaces/packagetype.repository.interface';
import { IPackageDayRepository } from '@/modules/package/repositories/interfaces/packageday.repository.interface';
import { IPackageDayTravelTypeRepository } from '@/modules/package/repositories/interfaces/packagedaytraveltype.repository.interface';
import { IPackageDaySightseeingRepository } from '@/modules/package/repositories/interfaces/packagedaysightseeing.repository.interface';
import { IPackageDayHotelRepository } from '@/modules/package/repositories/interfaces/packagedayhotel.repository.interface';

@injectable()
export class PackageService extends BaseService<Package, PackageCreateDto, PackageUpdateDto> implements IPackageService {
  constructor(
    @inject('IPackageRepository') repository: any,
    @inject('IPackageTypeRepository') private packageTypeRepository: IPackageTypeRepository,
    @inject('IPackageDayRepository') private packageDayRepository: IPackageDayRepository,
    @inject('IPackageDayTravelTypeRepository') private travelTypeRepository: IPackageDayTravelTypeRepository,
    @inject('IPackageDaySightseeingRepository') private sightseeingRepository: IPackageDaySightseeingRepository,
    @inject('IPackageDayHotelRepository') private hotelRepository: IPackageDayHotelRepository
  ) {
    super(repository);
  }

  /**
   * 1️⃣ Create Package (Main Table)
   * DB Operations:
   * - Validate packageTypeId exists in PackageType table
   * - If packageType.name is "international", require countryId
   * - Insert into Package table with all fields
   * - Return created package
   */
  async createPackage(data: PackageCreateDto): Promise<Package> {
    // Validate packageTypeId exists
    const packageType = await this.packageTypeRepository.findById(data.packageTypeId);
    if (!packageType) {
      throw new NotFoundException('PackageType not found');
    }

    // If international, require countryId
    if (packageType.name.toLowerCase() === 'international' && !data.countryId) {
      throw new BadRequestException('countryId is required for international packages');
    }

    // Insert into Package table
    const createdPackage = await this.repository.create(data);
    return createdPackage;
  }

  /**
   * 6️⃣ Get Full Package with Day-wise Details
   * DB Operations:
   * - Get Package by ID
   * - Get all PackageDay entries for this package
   * - For each day, get TravelType, Sightseeing, and Hotel entries
   * - Return deeply nested data structure
   */
  async getFullPackage(id: string): Promise<any> {
    // Get Package
    const pkg = await this.repository.findById(id);
    if (!pkg) {
      throw new NotFoundException('Package not found');
    }

    // Get PackageDay entries
    const packageDays = await this.packageDayRepository.findAll({ 
      where: { packageId: id },
      orderBy: { dayNumber: 'asc' }
    });

    // Get details for each day
    const daysWithDetails = await Promise.all(
      packageDays.map(async (day) => {
        const [travelTypes, sightseeings, hotels] = await Promise.all([
          this.travelTypeRepository.findAll({ where: { packageDayId: day.id } }),
          this.sightseeingRepository.findAll({ where: { packageDayId: day.id } }),
          this.hotelRepository.findAll({ where: { packageDayId: day.id } })
        ]);

        return {
          ...day,
          travelTypes,
          sightseeings,
          hotels
        };
      })
    );

    return {
      ...pkg,
      days: daysWithDetails
    };
  }

  /**
   * 7️⃣ Delete Package
   * DB Operations:
   * - Delete all PackageDayTravelType entries for each day
   * - Delete all PackageDaySightseeing entries for each day
   * - Delete all PackageDayHotel entries for each day
   * - Delete all PackageDay entries
   * - Delete Package
   * Note: With CASCADE on foreign keys, deleting Package will auto-delete children
   */
  async deletePackage(id: string): Promise<void> {
    const pkg = await this.repository.findById(id);
    if (!pkg) {
      throw new NotFoundException('Package not found');
    }

    // Get all package days
    const packageDays = await this.packageDayRepository.findAll({ where: { packageId: id } });
    const dayIds = packageDays.map(d => d.id);

    // Delete all related data for each day
    if (dayIds.length > 0) {
      await Promise.all([
        this.travelTypeRepository.deleteMany({ where: { packageDayId: { in: dayIds } } }),
        this.sightseeingRepository.deleteMany({ where: { packageDayId: { in: dayIds } } }),
        this.hotelRepository.deleteMany({ where: { packageDayId: { in: dayIds } } })
      ]);

      // Delete PackageDay entries
      await this.packageDayRepository.deleteMany({ where: { packageId: id } });
    }

    // Delete Package (CASCADE will handle children if configured)
    await this.repository.delete(id);
  }

  /**
   * 8️⃣ Update Package (Main Table Only)
   * DB Operations:
   * - Validate package exists
   * - Update packageName, days, nights
   * - Update country/state/city if international
   * - Save changes
   */
  async updatePackage(id: string, data: PackageUpdateDto): Promise<Package> {
    const pkg = await this.repository.findById(id);
    if (!pkg) {
      throw new NotFoundException('Package not found');
    }

    // Update package
    const updated = await this.repository.update(id, data);
    return updated;
  }

  /**
   * 9️⃣ Add Multiple Days + Activities in One Request
   * DB Operations:
   * - Insert Package
   * - Loop days → insert PackageDay
   * - Loop travelTypes → insert PackageDayTravelType
   * - Loop sightseeing → insert PackageDaySightseeing
   * - Loop hotels → insert PackageDayHotel
   * - Return full created package
   */
  async createFullPackage(data: any): Promise<any> {
    // Validate packageTypeId
    const packageType = await this.packageTypeRepository.findById(data.packageTypeId);
    if (!packageType) {
      throw new NotFoundException('PackageType not found');
    }

    if (packageType.name.toLowerCase() === 'international' && !data.countryId) {
      throw new BadRequestException('countryId is required for international packages');
    }

    // Insert Package
    const pkg = await this.repository.create({
      packageTypeId: data.packageTypeId,
      packageName: data.packageName,
      countryId: data.countryId,
      stateId: data.stateId,
      cityId: data.cityId,
      days: data.days,
      nights: data.nights
    });

    // Loop days and insert all related data
    const createdDays = [];
    if (data.packageDays && data.packageDays.length > 0) {
      for (const dayData of data.packageDays) {
        // Insert PackageDay
        const packageDay = await this.packageDayRepository.create({
          packageId: pkg.id,
          dayNumber: dayData.dayNumber
        });

        // Insert TravelTypes
        const travelTypes = [];
        if (dayData.travelTypes && dayData.travelTypes.length > 0) {
          for (const tt of dayData.travelTypes) {
            const created = await this.travelTypeRepository.create({
              packageDayId: packageDay.id,
              ...tt
            });
            travelTypes.push(created);
          }
        }

        // Insert Sightseeings
        const sightseeings = [];
        if (dayData.sightseeings && dayData.sightseeings.length > 0) {
          for (const ss of dayData.sightseeings) {
            const created = await this.sightseeingRepository.create({
              packageDayId: packageDay.id,
              ...ss
            });
            sightseeings.push(created);
          }
        }

        // Insert Hotels
        const hotels = [];
        if (dayData.hotels && dayData.hotels.length > 0) {
          for (const hotel of dayData.hotels) {
            const created = await this.hotelRepository.create({
              packageDayId: packageDay.id,
              ...hotel
            });
            hotels.push(created);
          }
        }

        createdDays.push({
          ...packageDay,
          travelTypes,
          sightseeings,
          hotels
        });
      }
    }

    return {
      ...pkg,
      days: createdDays
    };
  }
}
