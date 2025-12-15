import { inject, injectable } from 'tsyringe';
import { Package } from '@/modules/packages/entities/package.entity';
import { IPackageCompleteService } from './interfaces/package-complete.service.interface';
import { BadRequestException, NotFoundException, ConflictException } from '@/core/exceptions/http.exception';
import { prisma } from '@/loaders/prisma';
import logger from '@/core/utils/logger';
import { PackageImageUploadService } from './package-image-upload.service';

// Constants and Enums
const DEFAULT_MEAL_PROVIDER = 'Hotel Restaurant';
const DEFAULT_HOTEL_RATING = 3;
const MIN_PACKAGE_DURATION = 1;

enum PrismaErrorCode {
  UNIQUE_CONSTRAINT_VIOLATION = 'P2002',
  FOREIGN_KEY_CONSTRAINT_VIOLATION = 'P2003',
  RECORD_NOT_FOUND = 'P2025'
}

interface CityRecord {
  id: string;
  countryId: string;
  stateId: string | null;
  name: string;
  state?: { id: string; name: string; country?: { id: string; name: string } } | null;
  country?: { id: string; name: string } | null;
}

interface SightseeingRecord {
  id: string;
  name: string;
  cityId: string;
}

interface HotelRecord {
  id: string;
  name: string;
  cityId: string;
  rating: number | null;
}

interface MealTypeRecord {
  id: string;
  name: string;
}

interface MealCategoryRecord {
  id: string;
  name: string;
}

interface LookupData {
  cities: Map<string, CityRecord>;
  sightseeings: Map<string, SightseeingRecord>;
  hotels: Map<string, HotelRecord>;
  mealTypes: Map<string, MealTypeRecord>;
  mealCategories: Map<string, MealCategoryRecord>;
}

interface PackageCreationResult {
  id: string;
  packageName: string;
  uploadedImages?: number;
}

interface PackageCompleteData {
  packageData: any;
  images?: Express.Multer.File[];
}

@injectable()
export class PackageCompleteService implements IPackageCompleteService {
  constructor(
    @inject(PackageImageUploadService) private imageUploadService: PackageImageUploadService
  ) { }

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

    if (!data.packageType) {
      throw new BadRequestException('Package type is required');
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
    mealCategoryIds: string[];
    categoryIds: string[];
    activityIds: string[];
    snapshotIds: string[];
  } {
    const cityIds = new Set<string>();
    const sightseeingIds = new Set<string>();
    const hotelIds = new Set<string>();
    const mealTypeIds = new Set<string>();
    const mealCategoryIds = new Set<string>();
    const categoryIds = new Set<string>();
    const activityIds = new Set<string>();
    const snapshotIds = new Set<string>();

    // Collect category IDs
    if (data.categories) {
      data.categories.forEach((c: any) => {
        if (c.packageCategoryId) {
          categoryIds.add(c.packageCategoryId);
        }
      });
    }

    // Collect activity IDs
    if (data.activities) {
      data.activities.forEach((a: any) => {
        if (a.packageActivityId) {
          activityIds.add(a.packageActivityId);
        }
      });
    }

    // Collect snapshot IDs
    if (data.snapshots) {
      data.snapshots.forEach((s: any) => {
        if (s.packageSnapshotId) {
          snapshotIds.add(s.packageSnapshotId);
        }
      });
    }

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
            if (m.mealCategoryId) {
              mealCategoryIds.add(m.mealCategoryId);
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
      mealTypeIds: Array.from(mealTypeIds),
      mealCategoryIds: Array.from(mealCategoryIds),
      categoryIds: Array.from(categoryIds),
      activityIds: Array.from(activityIds),
      snapshotIds: Array.from(snapshotIds)
    };
  }

  /**
   * Fetches and validates all required lookup data
   */
  private async prepareLookupData(data: any): Promise<LookupData> {
    const { cityIds, sightseeingIds, hotelIds, mealTypeIds, mealCategoryIds, categoryIds, activityIds, snapshotIds } = this.collectUniqueIds(data);

    logger.info('Fetching lookup data', {
      cityCount: cityIds.length,
      sightseeingCount: sightseeingIds.length,
      hotelCount: hotelIds.length,
      mealTypeCount: mealTypeIds.length,
      mealCategoryCount: mealCategoryIds.length,
      categoryCount: categoryIds.length,
      activityCount: activityIds.length,
      snapshotCount: snapshotIds.length
    });

    // Fetch all data in parallel
    const [cities, sightseeings, hotels, mealTypes, mealCategories, categories, activities, snapshots] = await Promise.all([
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
      }) : [],
      mealCategoryIds.length > 0 ? prisma.mealCategory.findMany({
        where: { id: { in: mealCategoryIds } }
      }) : [],
      categoryIds.length > 0 ? prisma.packageCategory.findMany({
        where: { id: { in: categoryIds } }
      }) : [],
      activityIds.length > 0 ? prisma.packageActivity.findMany({
        where: { id: { in: activityIds } }
      }) : [],
      snapshotIds.length > 0 ? prisma.packageSnapshot.findMany({
        where: { id: { in: snapshotIds } }
      }) : []
    ]);

    // Validate all required entities exist
    this.validateRequiredEntities(cityIds, cities, 'cities');
    this.validateRequiredEntities(sightseeingIds, sightseeings, 'sightseeings');
    this.validateRequiredEntities(hotelIds, hotels, 'hotels');
    this.validateRequiredEntities(mealTypeIds, mealTypes, 'meal types');
    // Meal categories are optional, so we don't validate them strictly
    if (mealCategoryIds.length > 0) {
      this.validateRequiredEntities(mealCategoryIds, mealCategories, 'meal categories');
    }
    // Validate categories, activities, and snapshots
    if (categoryIds.length > 0) {
      this.validateRequiredEntities(categoryIds, categories, 'package categories');
    }
    if (activityIds.length > 0) {
      this.validateRequiredEntities(activityIds, activities, 'package activities');
    }
    if (snapshotIds.length > 0) {
      this.validateRequiredEntities(snapshotIds, snapshots, 'package snapshots');
    }

    // Create lookup maps for fast access
    return {
      cities: new Map(cities.map((c: CityRecord) => [c.id, c])),
      sightseeings: new Map(sightseeings.map((s: SightseeingRecord) => [s.id, s])),
      hotels: new Map(hotels.map((h: HotelRecord) => [h.id, h])),
      mealTypes: new Map(mealTypes.map((m: MealTypeRecord) => [m.id, m])),
      mealCategories: new Map(mealCategories.map((mc: MealCategoryRecord) => [mc.id, mc]))
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
      shortDescription: data.shortDescription?.trim(),
      longDescription: data.longDescription?.trim(),
      mainImage: data.mainImage?.trim(),
      thumbnail: data.thumbnail?.trim(),
      video: data.video?.trim(),
      packageType: data.packageType,
      duration: data.duration?.toString() || MIN_PACKAGE_DURATION.toString(),
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
   * Creates package images in database after S3 upload
   */
  private async createPackageImages(
    packageId: string,
    images: Express.Multer.File[],
    tx: any
  ): Promise<number> {
    if (!images || images.length === 0) {
      return 0;
    }

    logger.info('Uploading package images', {
      packageId,
      imageCount: images.length
    });

    // Upload images to S3
    const uploadResults = await Promise.all(
      images.map(image => this.imageUploadService.uploadImage(packageId, image))
    );

    // Filter successful uploads
    const successfulUploads = uploadResults.filter(result => result.success);

    if (successfulUploads.length === 0) {
      logger.warn('No images were uploaded successfully', { packageId });
      return 0;
    }

    // Create database records for successful uploads
    // Store only S3 path/key in DB - full URL can be constructed at runtime
    const galleryData = successfulUploads.map((upload, index) => ({
      packageId,
      imageUrl: upload.imagePath!,  // S3 path/key (not full URL)
      imageOrder: index + 1,
      isCover: index === 0 // First image as cover
    }));

    await tx.packageGallery.createMany({
      data: galleryData
    });

    logger.info('Package images created in database', {
      packageId,
      uploadedCount: successfulUploads.length,
      totalAttempted: images.length
    });

    return successfulUploads.length;
  }

  /**
   * Creates package pricing records
   * Fix: Use explicit undefined/null checks instead of truthy checks to correctly store 0 values
   */
  private async createPackagePricing(
    packageId: string,
    pricingData: any[],
    tx: any
  ): Promise<void> {
    if (!pricingData || pricingData.length === 0) {
      return;
    }

    const pricingRecords = pricingData.map(pricing => ({
      packageId,
      season: pricing.season || 'ON_SEASON',
      dateFrom: new Date(pricing.dateFrom),
      dateTo: new Date(pricing.dateTo),
      rackRate: parseFloat(pricing.rackRate),
      publishedRate: parseFloat(pricing.publishedRate),
      customerDiscountPercentage: pricing.customerDiscountPercentage !== undefined ? Number(pricing.customerDiscountPercentage) : null,
      customerDiscountAmount: pricing.customerDiscountAmount !== undefined ? Number(pricing.customerDiscountAmount) : null,
      adultRate: pricing.adultRate !== undefined ? Number(pricing.adultRate) : null,
      agentDiscountPercentage: pricing.agentDiscountPercentage !== undefined ? Number(pricing.agentDiscountPercentage) : null,
      agentDiscountAmount: pricing.agentDiscountAmount !== undefined ? Number(pricing.agentDiscountAmount) : null,
      agentRate: pricing.agentRate !== undefined ? Number(pricing.agentRate) : null,
      childRate: pricing.childRate !== undefined ? Number(pricing.childRate) : null,
      infantRate: pricing.infantRate !== undefined ? Number(pricing.infantRate) : null,
      createdBy: pricing.createdBy
    }));

    await tx.packagePricing.createMany({
      data: pricingRecords
    });
  }

  /**
   * Creates package policies (terms, inclusions, exclusions, payment, cancellation)
   */
  private async createPackagePolicies(
    packageId: string,
    policies: any,
    tx: any
  ): Promise<void> {
    const promises: Promise<any>[] = [];

    // Terms & Conditions
    if (policies.termsConditions?.length > 0) {
      promises.push(
        tx.packageTermsCondition.createMany({
          data: policies.termsConditions.map((term: any) => ({
            packageId,
            content: term.content,
            linkText: term.linkText,
            linkUrl: term.linkUrl,
            videoUrl: term.videoUrl,
            imageUrl: term.imageUrl,
            fileName: term.fileName,
            filePath: term.filePath,
            fileType: term.fileType,
            fileSize: term.fileSize ? BigInt(term.fileSize) : null,
            createdBy: term.createdBy
          }))
        })
      );
    }

    // Inclusions
    if (policies.inclusions?.length > 0) {
      promises.push(
        tx.packageInclusion.createMany({
          data: policies.inclusions.map((inclusion: any) => ({
            packageId,
            content: inclusion.content,
            createdBy: inclusion.createdBy
          }))
        })
      );
    }

    // Exclusions
    if (policies.exclusions?.length > 0) {
      promises.push(
        tx.packageExclusion.createMany({
          data: policies.exclusions.map((exclusion: any) => ({
            packageId,
            content: exclusion.content,
            createdBy: exclusion.createdBy
          }))
        })
      );
    }

    // Payment Policies
    if (policies.paymentPolicies?.length > 0) {
      promises.push(
        tx.packagePaymentPolicy.createMany({
          data: policies.paymentPolicies.map((policy: any) => ({
            packageId,
            content: policy.content,
            createdBy: policy.createdBy
          }))
        })
      );
    }

    // Cancellation Policies
    if (policies.cancellationPolicies?.length > 0) {
      promises.push(
        tx.packageCancellationPolicy.createMany({
          data: policies.cancellationPolicies.map((policy: any) => ({
            packageId,
            content: policy.content,
            createdBy: policy.createdBy
          }))
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
            // Map startAtDescription and endAtDescription from request to DB fields
            start_description: dayData.startAtDescription,
            end_description: dayData.endAtDescription,
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
    // Fix: Persist carpooling, vehicleType, timeFrom, timeTo, description exactly as sent
    if (dayData.travels?.length > 0) {
      promises.push(
        tx.packageCityDayTravel.createMany({
          data: dayData.travels.map((travel: any) => ({
            packageCityDayId,
            type: travel.type,
            carpooling: travel.carpooling !== undefined ? travel.carpooling : null,
            vehicleType: travel.vehicleType !== undefined ? travel.vehicleType : null,
            timeFrom: travel.timeFrom !== undefined ? travel.timeFrom : null,
            timeTo: travel.timeTo !== undefined ? travel.timeTo : null,
            description: travel.description !== undefined ? travel.description : null,
          })),
        })
      );
    }

    // Create sightseeings
    // Fix: Store ticket as STRING exactly as sent (do not convert to number)
    if (dayData.sightseeings?.length > 0) {
      const sightseeingData = dayData.sightseeings.map((sightseeing: any) => {
        const sightseeingRecord = lookupData.sightseeings.get(sightseeing.sightseeingId);
        if (!sightseeingRecord) {
          throw new NotFoundException(`Sightseeing with ID ${sightseeing.sightseeingId} not found`);
        }
        return {
          packageCityDayId,
          sightseeingName: sightseeingRecord.name,
          // Store ticket as string exactly as provided - do not convert to number
          ticket: sightseeing.ticket !== undefined ? String(sightseeing.ticket) : null,
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
    // Fix: Hotel rating priority - request.starRating first, then Hotel.rating, then DEFAULT_HOTEL_RATING
    if (dayData.hotels?.length > 0) {
      const hotelData = dayData.hotels.map((hotel: any) => {
        const hotelRecord = lookupData.hotels.get(hotel.hotelId);
        if (!hotelRecord) {
          throw new NotFoundException(`Hotel with ID ${hotel.hotelId} not found`);
        }
        
        // Priority: 1. request.starRating, 2. Hotel.rating, 3. DEFAULT_HOTEL_RATING
        let starRating: number;
        if (hotel.starRating !== undefined && hotel.starRating !== null) {
          starRating = hotel.starRating;
        } else if (hotelRecord.rating !== undefined && hotelRecord.rating !== null) {
          starRating = hotelRecord.rating;
        } else {
          starRating = DEFAULT_HOTEL_RATING;
        }
        
        return {
          packageCityDayId,
          hotelName: hotelRecord.name,
          starRating,
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

    // Create meals using ONLY PackageCityDayMealType (supports meal category)
    // Fix: Removed PackageCityDayMeal usage - use only PackageCityDayMealType for meal creation
    if (dayData.meals?.length > 0) {
      const mealData = dayData.meals.map((meal: any) => {
        const mealTypeRecord = lookupData.mealTypes.get(meal.mealTypeId);
        if (!mealTypeRecord) {
          throw new NotFoundException(`Meal type with ID ${meal.mealTypeId} not found`);
        }
        
        // Validate mealCategoryId only if provided
        if (meal.mealCategoryId && !lookupData.mealCategories.get(meal.mealCategoryId)) {
          throw new NotFoundException(`Meal category with ID ${meal.mealCategoryId} not found`);
        }
        
        return {
          packageCityDayId,
          mealTypeId: meal.mealTypeId,           // Link to MealType table
          mealCategoryId: meal.mealCategoryId || null,  // Link to MealCategory table (optional)
          provider: meal.provider || DEFAULT_MEAL_PROVIDER,
          time: meal.time,
          description: meal.description,
        };
      });

      promises.push(
        tx.packageCityDayMealType.createMany({
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
   * Uploads images for an existing package
   */
  async uploadPackageImages(packageId: string, images: Express.Multer.File[]): Promise<{
    uploadedCount: number;
    totalAttempted: number;
    imagePaths: string[];   // S3 paths/keys (stored in DB)
    imageUrls: string[];    // Full S3 URLs (for immediate use)
  }> {
    if (!images || images.length === 0) {
      throw new BadRequestException('No images provided');
    }

    logger.info('Uploading images for existing package', {
      packageId,
      imageCount: images.length
    });

    // Upload images to S3
    const uploadResults = await Promise.all(
      images.map(image => this.imageUploadService.uploadImage(packageId, image))
    );

    // Filter successful uploads
    const successfulUploads = uploadResults.filter(result => result.success);

    if (successfulUploads.length === 0) {
      throw new BadRequestException('Failed to upload any images');
    }

    // Get current max order for this package
    const maxOrderResult = await prisma.packageGallery.aggregate({
      where: { packageId },
      _max: { imageOrder: true }
    });

    const startOrder = (maxOrderResult._max.imageOrder || 0) + 1;

    // Create database records for successful uploads
    // Store only S3 path/key in DB - full URL can be constructed at runtime
    const galleryData = successfulUploads.map((upload, index) => ({
      packageId,
      imageUrl: upload.imagePath!,  // S3 path/key (not full URL)
      imageOrder: startOrder + index,
      isCover: false // Don't automatically set as cover for additional uploads
    }));

    await prisma.packageGallery.createMany({
      data: galleryData
    });

    logger.info('Package images uploaded and saved', {
      packageId,
      uploadedCount: successfulUploads.length,
      totalAttempted: images.length
    });

    return {
      uploadedCount: successfulUploads.length,
      totalAttempted: images.length,
      imagePaths: successfulUploads.map(upload => upload.imagePath!),  // S3 paths
      imageUrls: successfulUploads.map(upload => upload.fullUrl!)      // Full URLs for immediate use
    };
  }

  /**
   * Creates a complete package with all relations and images
   */
  async createCompletePackage(data: PackageCompleteData): Promise<PackageCreationResult> {
    const transactionId = `pkg_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    const { packageData, images } = data;

    try {
      // 1. Validate payload structure before starting transaction
      this.validatePayload(packageData);

      // 2. Pre-fetch all required data to avoid long-running transactions
      const lookupData = await this.prepareLookupData(packageData);

      logger.info('Starting package creation transaction', { transactionId, packageName: packageData.packageName });

      // 3. Start transaction with guardrails
      const result = await prisma.$transaction(async (tx) => {
        logger.info('Transaction started', { transactionId });

        // Create the main package
        const createdPackage = await this.createPackageCore(packageData, tx);

        // Create package relations
        await this.createPackageRelations(createdPackage.id, packageData, tx);

        // Create package cities and days
        await this.createPackageCitiesAndDays(createdPackage.id, packageData, lookupData, tx);

        // Create package pricing
        if (packageData.pricing) {
          await this.createPackagePricing(createdPackage.id, packageData.pricing, tx);
        }

        // Create package policies
        if (packageData.policies) {
          await this.createPackagePolicies(createdPackage.id, packageData.policies, tx);
        }

        // Upload and create package images
        let uploadedImages = 0;
        if (images && images.length > 0) {
          uploadedImages = await this.createPackageImages(createdPackage.id, images, tx);
        }

        logger.info('Transaction completed successfully', {
          transactionId,
          packageId: createdPackage.id,
          uploadedImages
        });

        // Return response with image count
        return {
          id: createdPackage.id,
          packageName: createdPackage.packageName,
          uploadedImages
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