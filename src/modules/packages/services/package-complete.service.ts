import { inject, injectable } from 'tsyringe';
import { Package } from '@/modules/packages/entities/package.entity';
import { IPackageCompleteService } from './interfaces/package-complete.service.interface';
import { BadRequestException, NotFoundException, ConflictException } from '@/core/exceptions/http.exception';
import { prisma } from '@/loaders/prisma';
import logger from '@/core/utils/logger';

// Constants and Enums
const DEFAULT_MEAL_PROVIDER = 'Hotel Restaurant';
const DEFAULT_HOTEL_RATING = 3;
const MIN_PACKAGE_DURATION = 1;

enum PrismaErrorCode {
  UNIQUE_CONSTRAINT_VIOLATION = 'P2002',
  FOREIGN_KEY_CONSTRAINT_VIOLATION = 'P2003',
  RECORD_NOT_FOUND = 'P2025'
}

interface LookupData {
  cities: Map<string, any>;
  sightseeings: Map<string, any>;
  hotels: Map<string, any>;
  mealTypes: Map<string, any>;
}

interface PackageCreationResult {
  id: string;
  packageName: string;
}

@injectable()
export class PackageCompleteService implements IPackageCompleteService {
  constructor() {}

  /**
   * Validates the payload structure before processing
   */
  private validatePayload(data: any): void {
    if (!data) {
      throw new BadRequestException('Package data is required');
    }

    if (!data.packageName?.trim()) {
      throw new BadRequestException('Package name is required');
    }

    if (!data.packageTypeId) {
      throw new BadRequestException('Package type ID is required');
    }

    if (!data.cities || !Array.isArray(data.cities) || data.cities.length === 0) {
      throw new BadRequestException('At least one city is required');
    }

    // Validate each city has days
    data.cities.forEach((city: any, index: number) => {
      if (!city.cityId) {
        throw new BadRequestException(`City at index ${index} must have a cityId`);
      }
      
      if (!city.days || !Array.isArray(city.days) || city.days.length === 0) {
        throw new BadRequestException(`City at index ${index} must have at least one day`);
      }
    });
  }

  /**
   * Collects and deduplicates all IDs needed for lookup
   */
  private collectUniqueIds(data: any): {
    cityIds: string[];
    sightseeingIds: string[];
    hotelIds: string[];
    mealTypeIds: string[];
  } {
    const cityIds = new Set<string>();
    const sightseeingIds = new Set<string>();
    const hotelIds = new Set<string>();
    const mealTypeIds = new Set<string>();

    // Collect city IDs
    data.cities.forEach((city: any) => {
      if (city.cityId) {
        cityIds.add(city.cityId);
      }

      // Collect IDs from nested data
      city.days.forEach((day: any) => {
        if (day.sightseeings) {
          day.sightseeings.forEach((s: any) => {
            if (s.sightseeingId) {
              sightseeingIds.add(s.sightseeingId);
            }
          });
        }

        if (day.hotels) {
          day.hotels.forEach((h: any) => {
            if (h.hotelId) {
              hotelIds.add(h.hotelId);
            }
          });
        }

        if (day.meals) {
          day.meals.forEach((m: any) => {
            if (m.mealTypeId) {
              mealTypeIds.add(m.mealTypeId);
            }
          });
        }
      });
    });

    // Also collect meal type IDs from package level
    if (data.mealTypes) {
      data.mealTypes.forEach((m: any) => {
        if (m.mealTypeId) {
          mealTypeIds.add(m.mealTypeId);
        }
      });
    }

    return {
      cityIds: Array.from(cityIds),
      sightseeingIds: Array.from(sightseeingIds),
      hotelIds: Array.from(hotelIds),
      mealTypeIds: Array.from(mealTypeIds)
    };
  }

  /**
   * Fetches and validates all required lookup data
   */
  private async prepareLookupData(data: any): Promise<LookupData> {
    const { cityIds, sightseeingIds, hotelIds, mealTypeIds } = this.collectUniqueIds(data);

    logger.info('Fetching lookup data', {
      cityCount: cityIds.length,
      sightseeingCount: sightseeingIds.length,
      hotelCount: hotelIds.length,
      mealTypeCount: mealTypeIds.length
    });

    // Fetch all data in parallel
    const [cities, sightseeings, hotels, mealTypes] = await Promise.all([
      prisma.city.findMany({
        where: { id: { in: cityIds } },
        include: { 
          state: {
            include: {
              country: true
            }
          },
          country: true
        }
      }),
      sightseeingIds.length > 0 ? prisma.sightseeing.findMany({
        where: { id: { in: sightseeingIds } }
      }) : [],
      hotelIds.length > 0 ? prisma.hotel.findMany({
        where: { id: { in: hotelIds } }
      }) : [],
      mealTypeIds.length > 0 ? prisma.mealType.findMany({
        where: { id: { in: mealTypeIds } }
      }) : []
    ]);

    // Validate all required entities exist
    this.validateRequiredEntities(cityIds, cities, 'cities');
    this.validateRequiredEntities(sightseeingIds, sightseeings, 'sightseeings');
    this.validateRequiredEntities(hotelIds, hotels, 'hotels');
    this.validateRequiredEntities(mealTypeIds, mealTypes, 'meal types');

    // Create lookup maps for fast access
    return {
      cities: new Map(cities.map(c => [c.id, c])),
      sightseeings: new Map(sightseeings.map(s => [s.id, s])),
      hotels: new Map(hotels.map(h => [h.id, h])),
      mealTypes: new Map(mealTypes.map(m => [m.id, m]))
    };
  }

  /**
   * Validates that all required entities were found
   */
  private validateRequiredEntities(requestedIds: string[], foundEntities: any[], entityType: string): void {
    const foundIds = new Set(foundEntities.map(e => e.id));
    const missingIds = requestedIds.filter(id => !foundIds.has(id));
    
    if (missingIds.length > 0) {
      throw new NotFoundException(`Missing ${entityType}: ${missingIds.join(', ')}`);
    }
  }

  /**
   * Creates the core package entity
   */
  private async createPackageCore(data: any, tx: any): Promise<any> {
    const packageData = {
      packageName: data.packageName.trim(),
      description: data.description?.trim(),
      shortDescription: data.shortDescription?.trim(),
      longDescription: data.longDescription?.trim(),
      mainImage: data.mainImage?.trim(),
      thumbnail: data.thumbnail?.trim(),
      video: data.video?.trim(),
      packageTypeId: data.packageTypeId,
      days: Math.max(data.duration || MIN_PACKAGE_DURATION, MIN_PACKAGE_DURATION),
      nights: Math.max((data.duration || MIN_PACKAGE_DURATION) - 1, 0),
      basePrice: data.price ? parseFloat(data.price) : null,
    };

    return await tx.package.create({
      data: packageData,
    });
  }

  /**
   * Creates package relations (categories, activities, snapshots)
   */
  private async createPackageRelations(packageId: string, data: any, tx: any): Promise<void> {
    const promises: Promise<any>[] = [];

    // Create package category mappings
    if (data.categories?.length > 0) {
      promises.push(
        tx.packageCategoryMapping.createMany({
          data: data.categories.map((category: any) => ({
            packageId,
            categoryId: category.packageCategoryId,
          })),
        })
      );
    }

    // Create package activity mappings
    if (data.activities?.length > 0) {
      promises.push(
        tx.packageActivityMapping.createMany({
          data: data.activities.map((activity: any) => ({
            packageId,
            activityId: activity.packageActivityId,
          })),
        })
      );
    }

    // Create package snapshot mappings
    if (data.snapshots?.length > 0) {
      promises.push(
        tx.packageSnapshotMapping.createMany({
          data: data.snapshots.map((snapshot: any) => ({
            packageId,
            snapshotId: snapshot.packageSnapshotId,
          })),
        })
      );
    }

    // Create package options (one-to-one relationship)
    if (data.options) {
      promises.push(
        tx.packageOption.create({
          data: {
            packageId,
            includeGroupDeparture: data.options.includeGroupDeparture || false,
            includeFixedDeparture: data.options.includeFixedDeparture || false,
            includePackageAvailability: data.options.includePackageAvailability || false,
          },
        })
      );
    }

    await Promise.all(promises);
  }

  /**
   * Creates package cities and their associated days
   */
  private async createPackageCitiesAndDays(packageId: string, data: any, lookupData: LookupData, tx: any): Promise<void> {
    for (const cityData of data.cities) {
      const city = lookupData.cities.get(cityData.cityId);
      
      if (!city) {
        throw new BadRequestException(`City with ID ${cityData.cityId} not found`);
      }

      const packageCity = await tx.packageCity.create({
        data: {
          packageId,
          cityId: cityData.cityId,
          countryId: city.countryId,
          stateId: city.stateId,
          totalDays: cityData.days.length,
          totalNights: Math.max(0, cityData.days.length - 1),
        },
      });

      // Create package city days and their details
      for (const dayData of cityData.days) {
        const packageCityDay = await tx.packageCityDay.create({
          data: {
            packageCityId: packageCity.id,
            dayNumber: dayData.dayNumber,
            startTime: dayData.startTime,
            endTime: dayData.endTime,
            startFrom: dayData.startFrom,
            endAt: dayData.endAt,
            description: dayData.description,
          },
        });

        await this.createDayDetails(packageCityDay.id, dayData, lookupData, tx);
      }
    }
  }

  /**
   * Creates day-specific details (travels, sightseeings, hotels, meals)
   */
  private async createDayDetails(packageCityDayId: string, dayData: any, lookupData: LookupData, tx: any): Promise<void> {
    const promises: Promise<any>[] = [];

    // Create travels
    if (dayData.travels?.length > 0) {
      promises.push(
        tx.packageCityDayTravel.createMany({
          data: dayData.travels.map((travel: any) => ({
            packageCityDayId,
            type: travel.type,
            carpooling: travel.carpooling,
            vehicleType: travel.vehicleType,
            timeFrom: travel.timeFrom,
            timeTo: travel.timeTo,
            description: travel.description,
          })),
        })
      );
    }

    // Create sightseeings
    if (dayData.sightseeings?.length > 0) {
      const sightseeingData = dayData.sightseeings.map((sightseeing: any) => {
        const sightseeingRecord = lookupData.sightseeings.get(sightseeing.sightseeingId);
        if (!sightseeingRecord) {
          throw new NotFoundException(`Sightseeing with ID ${sightseeing.sightseeingId} not found`);
        }
        return {
          packageCityDayId,
          sightseeingName: sightseeingRecord.name,
          ticket: sightseeing.description || '',
          timeFrom: sightseeing.timeFrom,
          timeTo: sightseeing.timeTo,
        };
      });

      promises.push(
        tx.packageCityDaySightseeing.createMany({
          data: sightseeingData,
        })
      );
    }

    // Create hotels
    if (dayData.hotels?.length > 0) {
      const hotelData = dayData.hotels.map((hotel: any) => {
        const hotelRecord = lookupData.hotels.get(hotel.hotelId);
        if (!hotelRecord) {
          throw new NotFoundException(`Hotel with ID ${hotel.hotelId} not found`);
        }
        return {
          packageCityDayId,
          hotelName: hotelRecord.name,
          starRating: hotelRecord.rating || DEFAULT_HOTEL_RATING,
          hotelType: hotel.hotelType,
          checkInTime: hotel.checkIn,
          checkOutTime: hotel.checkOut,
          roomType: hotel.roomType,
          numberOfRooms: hotel.numberOfRooms,
        };
      });

      promises.push(
        tx.packageCityDayHotel.createMany({
          data: hotelData,
        })
      );
    }

    // Create meals
    if (dayData.meals?.length > 0) {
      const mealData = dayData.meals.map((meal: any) => {
        const mealTypeRecord = lookupData.mealTypes.get(meal.mealTypeId);
        if (!mealTypeRecord) {
          throw new NotFoundException(`Meal type with ID ${meal.mealTypeId} not found`);
        }
        return {
          packageCityDayId,
          mealType: mealTypeRecord.name,
          provider: meal.provider || DEFAULT_MEAL_PROVIDER,
          time: meal.time,
          description: meal.description,
        };
      });

      promises.push(
        tx.packageCityDayMeal.createMany({
          data: mealData,
        })
      );
    }

    await Promise.all(promises);
  }

  /**
   * Maps Prisma errors to domain-specific exceptions
   */
  private handlePrismaError(error: any): never {
    if (error.code === PrismaErrorCode.UNIQUE_CONSTRAINT_VIOLATION) {
      throw new ConflictException(`Duplicate entry: ${error.meta?.target || 'unknown field'}`);
    }
    
    if (error.code === PrismaErrorCode.FOREIGN_KEY_CONSTRAINT_VIOLATION) {
      throw new BadRequestException(`Invalid reference: ${error.meta?.field_name || 'unknown field'}`);
    }
    
    if (error.code === PrismaErrorCode.RECORD_NOT_FOUND) {
      throw new NotFoundException(`Required record not found: ${error.meta?.cause || 'unknown'}`);
    }

    throw new BadRequestException(`Database error: ${error.message || 'Unknown error'}`);
  }

  /**
   * Fetches the complete package with all relations (separate from creation)
   */
  async getCompletePackage(packageId: string): Promise<Package> {
    const packageData = await prisma.package.findUnique({
      where: { id: packageId },
      include: {
        packageType: true,
        packagecategorymappings: {
          include: {
            category: true
          }
        },
        packageactivitymappings: {
          include: {
            activity: true
          }
        },
        packagesnapshotmappings: {
          include: {
            snapshot: true
          }
        },
        packagecities: {
          include: {
            cityObj: true,
            stateObj: true,
            countryObj: true,
            packagecitydaies: {
              include: {
                packagecitydaytravels: true,
                packagecitydaysightseeings: true,
                packagecitydayhotels: true,
                packagecitydaymeals: true,
                packagecitydaymealtypes: {
                  include: {
                    mealType: true
                  }
                }
              }
            }
          }
        },
        destinationPackages: {
          include: {
            destination: true
          }
        },
        packageTermsConditions: true,
        packageInclusions: true,
        packageExclusions: true,
        packagePaymentPolicies: true,
        packageCancellationPolicies: true,
        packagePricings: true,
        packageOptions: true,
        packageGalleries: true
      },
    });

    if (!packageData) {
      throw new NotFoundException(`Package with ID ${packageId} not found`);
    }

    return packageData as Package;
  }

  /**
   * Creates a complete package with all relations
   */
  async createCompletePackage(data: any): Promise<PackageCreationResult> {
    const transactionId = `pkg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    try {
      // 1. Validate payload structure before starting transaction
      this.validatePayload(data);
      
      // 2. Pre-fetch all required data to avoid long-running transactions
      const lookupData = await this.prepareLookupData(data);
      
      logger.info('Starting package creation transaction', { transactionId, packageName: data.packageName });
      
      // 3. Start transaction with guardrails
      const result = await prisma.$transaction(async (tx) => {
        logger.info('Transaction started', { transactionId });

        // Create the main package
        const createdPackage = await this.createPackageCore(data, tx);
        
        // Create package relations
        await this.createPackageRelations(createdPackage.id, data, tx);
        
        // Create package cities and days
        await this.createPackageCitiesAndDays(createdPackage.id, data, lookupData, tx);

        logger.info('Transaction completed successfully', { 
          transactionId, 
          packageId: createdPackage.id 
        });

        // Return minimal response
        return {
          id: createdPackage.id,
          packageName: createdPackage.packageName
        };
      });

      logger.info('Package created successfully', { 
        transactionId, 
        packageId: result.id,
        packageName: result.packageName 
      });

      return result;
    } catch (error: any) {
      logger.error('Package creation failed', { 
        transactionId, 
        error: error.message,
        stack: error.stack 
      });

      if (error instanceof BadRequestException || 
          error instanceof NotFoundException || 
          error instanceof ConflictException) {
        throw error;
      }

      // Handle Prisma-specific errors
      if (error.code && error.code.startsWith('P')) {
        this.handlePrismaError(error);
      }

      throw new BadRequestException(`Failed to create complete package: ${error.message || 'Unknown error'}`);
    }
  }
}