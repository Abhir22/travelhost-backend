import { inject, injectable } from 'tsyringe';
import { Package } from '@/modules/packages/entities/package.entity';
import { IPackageCompleteService } from './interfaces/package-complete.service.interface';
import { BadRequestException, NotFoundException } from '@/core/exceptions/http.exception';
import { prisma } from '@/loaders/prisma';

@injectable()
export class PackageCompleteService implements IPackageCompleteService {
  constructor() {}

  private async prepareLookupData(data: any) {
    // Collect all IDs that need to be looked up
    const cityIds = data.cities.map((city: any) => city.cityId);
    const sightseeingIds: string[] = [];
    const hotelIds: string[] = [];
    const mealTypeIds: string[] = [];

    // Collect IDs from nested data
    data.cities.forEach((city: any) => {
      city.days.forEach((day: any) => {
        if (day.sightseeings) {
          sightseeingIds.push(...day.sightseeings.map((s: any) => s.sightseeingId));
        }
        if (day.hotels) {
          hotelIds.push(...day.hotels.map((h: any) => h.hotelId));
        }
        if (day.meals) {
          mealTypeIds.push(...day.meals.map((m: any) => m.mealTypeId));
        }
      });
    });

    // Also collect meal type IDs from package level
    if (data.mealTypes) {
      mealTypeIds.push(...data.mealTypes.map((m: any) => m.mealTypeId));
    }

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
        where: { id: { in: sightseeingIds } },
        include: {
          city: {
            include: {
              state: true,
              country: true
            }
          }
        }
      }) : [],
      hotelIds.length > 0 ? prisma.hotel.findMany({
        where: { id: { in: hotelIds } },
        include: {
          city: {
            include: {
              state: true,
              country: true
            }
          },
          hotelType: true
        }
      }) : [],
      mealTypeIds.length > 0 ? prisma.mealType.findMany({
        where: { id: { in: mealTypeIds } }
      }) : []
    ]);

    // Create lookup maps for fast access
    return {
      cities: new Map(cities.map(c => [c.id, c])),
      sightseeings: new Map(sightseeings.map(s => [s.id, s])),
      hotels: new Map(hotels.map(h => [h.id, h])),
      mealTypes: new Map(mealTypes.map(m => [m.id, m]))
    };
  }

  async createCompletePackage(data: any): Promise<Package> {
    try {
      // Pre-fetch all required data to avoid long-running transactions
      const lookupData = await this.prepareLookupData(data);
      
      // Start a transaction to ensure data consistency
      const result = await prisma.$transaction(async (tx) => {
        // 1. Create the main package
        const packageData = {
          packageName: data.packageName,
          description: data.description,
          shortDescription: data.shortDescription,
          longDescription: data.longDescription,
          mainImage: data.mainImage,
          thumbnail: data.thumbnail,
          video: data.video,
          packageTypeId: data.packageTypeId,
          days: data.duration || 1,
          nights: data.duration ? data.duration - 1 : 0,
          basePrice: data.price,
        };

        const createdPackage = await tx.package.create({
          data: packageData,
        });

        // 2. Package meal types removed - meals are handled at day level

        // 3. Create package category mappings if provided
        if (data.categories && data.categories.length > 0) {
          await tx.packageCategoryMapping.createMany({
            data: data.categories.map((category: any) => ({
              packageId: createdPackage.id,
              categoryId: category.packageCategoryId,
            })),
          });
        }

        // 4. Create package activity mappings if provided
        if (data.activities && data.activities.length > 0) {
          await tx.packageActivityMapping.createMany({
            data: data.activities.map((activity: any) => ({
              packageId: createdPackage.id,
              activityId: activity.packageActivityId,
            })),
          });
        }

        // 5. Create package snapshot mappings if provided
        if (data.snapshots && data.snapshots.length > 0) {
          await tx.packageSnapshotMapping.createMany({
            data: data.snapshots.map((snapshot: any) => ({
              packageId: createdPackage.id,
              snapshotId: snapshot.packageSnapshotId,
            })),
          });
        }

        // 6. Create package cities and their days
        for (const cityData of data.cities) {
          // Get city details from pre-fetched data
          const city = lookupData.cities.get(cityData.cityId);
          
          if (!city) {
            throw new BadRequestException(`City with ID ${cityData.cityId} not found`);
          }

          const packageCity = await tx.packageCity.create({
            data: {
              packageId: createdPackage.id,
              cityId: cityData.cityId,
              countryId: city.countryId,
              stateId: city.stateId,
              totalDays: cityData.days.length,
              totalNights: Math.max(0, cityData.days.length - 1),
            },
          });

          // 7. Create package city days and their details
          for (const dayData of cityData.days) {
            const packageCityDay = await tx.packageCityDay.create({
              data: {
                packageCityId: packageCity.id,
                dayNumber: dayData.dayNumber,
                description: dayData.description,
              },
            });

            // 8. Create travels for this day
            if (dayData.travels && dayData.travels.length > 0) {
              await tx.packageCityDayTravel.createMany({
                data: dayData.travels.map((travel: any) => ({
                  packageCityDayId: packageCityDay.id,
                  type: travel.type,
                  carpooling: travel.carpooling,
                  vehicleType: travel.vehicleType,
                  timeFrom: travel.timeFrom,
                  timeTo: travel.timeTo,
                  description: travel.description,
                })),
              });
            }

            // 9. Create sightseeings for this day
            if (dayData.sightseeings && dayData.sightseeings.length > 0) {
              const sightseeingData = dayData.sightseeings
                .map((sightseeing: any) => {
                  const sightseeingRecord = lookupData.sightseeings.get(sightseeing.sightseeingId);
                  return sightseeingRecord ? {
                    packageCityDayId: packageCityDay.id,
                    sightseeingName: sightseeingRecord.name,
                    ticket: sightseeing.description || '',
                  } : null;
                })
                .filter(Boolean);

              if (sightseeingData.length > 0) {
                await tx.packageCityDaySightseeing.createMany({
                  data: sightseeingData,
                });
              }
            }

            // 10. Create hotels for this day
            if (dayData.hotels && dayData.hotels.length > 0) {
              const hotelData = dayData.hotels
                .map((hotel: any) => {
                  const hotelRecord = lookupData.hotels.get(hotel.hotelId);
                  return hotelRecord ? {
                    packageCityDayId: packageCityDay.id,
                    hotelName: hotelRecord.name,
                    starRating: hotelRecord.rating || 3,
                    roomType: hotel.roomType,
                    checkInTime: hotel.checkIn,
                    checkOutTime: hotel.checkOut,
                  } : null;
                })
                .filter(Boolean);

              if (hotelData.length > 0) {
                await tx.packageCityDayHotel.createMany({
                  data: hotelData,
                });
              }
            }

            // 11. Create meals for this day
            if (dayData.meals && dayData.meals.length > 0) {
              const mealData = dayData.meals
                .map((meal: any) => {
                  const mealTypeRecord = lookupData.mealTypes.get(meal.mealTypeId);
                  return mealTypeRecord ? {
                    packageCityDayId: packageCityDay.id,
                    mealType: mealTypeRecord.name,
                    provider: 'Hotel Restaurant', // Default provider
                    description: meal.description,
                  } : null;
                })
                .filter(Boolean);

              if (mealData.length > 0) {
                await tx.packageCityDayMeal.createMany({
                  data: mealData,
                });
              }
            }
          }
        }

        // 12. Return the complete package with all relations
        return await tx.package.findUnique({
          where: { id: createdPackage.id },
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
      });

      if (!result) {
        throw new BadRequestException('Failed to create package');
      }

      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Failed to create complete package: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}