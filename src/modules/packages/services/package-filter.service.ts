import { inject, injectable } from 'tsyringe';
import { prisma } from '@/loaders/prisma';
import { IPackageFilterService, PackageFilterResult } from './interfaces/package-filter.service.interface';
import { PackageFilterInput } from '@/modules/packages/validations/package-filter.validation';
import { Package } from '@/modules/packages/entities/package.entity';

@injectable()
export class PackageFilterService implements IPackageFilterService {
    // India country name for domestic package default
    private readonly INDIA_COUNTRY_NAME = 'India';

    constructor() { }

    /**
     * Filter packages based on various criteria
     */
    async filterPackages(filters: PackageFilterInput): Promise<PackageFilterResult> {
        const {
            packageType,
            countryId,
            stateId,
            cityId,
            destinationType = 'all',
            page = 1,
            pageSize = 10,
        } = filters;

        // Build the where clause
        const whereClause: any = {};

        // Filter by package type (domestic/international)
        if (packageType) {
            whereClause.packageType = packageType;
        }

        // Build location filters based on packageCities relationship
        const packageCityFilters: any = {};

        // Handle country filter
        let effectiveCountryId = countryId;

        // For domestic packages without explicit country, default to India
        if (packageType === 'domestic' && !countryId) {
            const india = await prisma.country.findFirst({
                where: { name: this.INDIA_COUNTRY_NAME },
            });
            if (india) {
                effectiveCountryId = india.id;
            }
        }

        if (effectiveCountryId) {
            packageCityFilters.countryId = effectiveCountryId;
        }

        // Filter by state (only for domestic/India)
        if (stateId) {
            packageCityFilters.stateId = stateId;
        }

        // Filter by city
        if (cityId) {
            packageCityFilters.cityId = cityId;
        }

        // Apply package city filters if any
        if (Object.keys(packageCityFilters).length > 0) {
            whereClause.packagecities = {
                some: packageCityFilters,
            };
        }

        // Build the complete query with all includes
        const includeClause = {
            packagecategorymappings: {
                include: {
                    category: true,
                },
            },
            packageactivitymappings: {
                include: {
                    activity: true,
                },
            },
            packagesnapshotmappings: {
                include: {
                    snapshot: true,
                },
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
                                    mealType: true,
                                },
                            },
                        },
                    },
                },
            },
            destinationPackages: {
                include: {
                    destination: true,
                },
            },
            packageTermsConditions: true,
            packageInclusions: true,
            packageExclusions: true,
            packagePaymentPolicies: true,
            packageCancellationPolicies: true,
            packagePricings: true,
            packageOptions: true,
            packageGalleries: true,
        };

        // First, get all matching packages to filter by destination type
        let allPackages = await prisma.package.findMany({
            where: whereClause,
            include: includeClause,
        });

        // Filter by destination type (single/multi/all)
        if (destinationType !== 'all') {
            allPackages = allPackages.filter((pkg: any) => {
                const cityCount = pkg.packagecities?.length || 0;
                if (destinationType === 'single') {
                    return cityCount === 1;
                } else if (destinationType === 'multi') {
                    return cityCount > 1;
                }
                return true;
            });
        }

        // Calculate pagination
        const total = allPackages.length;
        const totalPages = Math.ceil(total / pageSize);
        const skip = (page - 1) * pageSize;
        const paginatedPackages = allPackages.slice(skip, skip + pageSize);

        // Get filter information for response
        const filterInfo: PackageFilterResult['filters'] = {
            destinationType,
        };

        if (packageType) {
            filterInfo.packageType = packageType;
        }

        if (effectiveCountryId) {
            const country = await prisma.country.findUnique({
                where: { id: effectiveCountryId },
            });
            if (country) {
                filterInfo.countryId = country.id;
                filterInfo.countryName = country.name;
            }
        }

        if (stateId) {
            const state = await prisma.state.findUnique({
                where: { id: stateId },
            });
            if (state) {
                filterInfo.stateId = state.id;
                filterInfo.stateName = state.name;
            }
        }

        if (cityId) {
            const city = await prisma.city.findUnique({
                where: { id: cityId },
            });
            if (city) {
                filterInfo.cityId = city.id;
                filterInfo.cityName = city.name;
            }
        }

        return {
            data: paginatedPackages as Package[],
            total,
            page,
            pageSize,
            totalPages,
            filters: filterInfo,
        };
    }

    /**
     * Get available countries for package filtering
     */
    async getAvailableCountries(isInternational?: boolean): Promise<Array<{ id: string; name: string; packageCount: number }>> {
        const whereClause: any = {};

        if (isInternational !== undefined) {
            const packageTypeValue = isInternational ? 'international' : 'domestic';
            whereClause.packagecities = {
                some: {
                    package: {
                        packageType: packageTypeValue,
                    },
                },
            };
        }

        const countries = await prisma.country.findMany({
            where: {
                packageCities: {
                    some: {},
                },
                ...whereClause,
            },
            include: {
                _count: {
                    select: {
                        packageCities: true,
                    },
                },
            },
            orderBy: {
                name: 'asc',
            },
        });

        // Get unique package counts per country
        const result = await Promise.all(
            countries.map(async (country) => {
                const packageCount = await prisma.package.count({
                    where: {
                        packagecities: {
                            some: {
                                countryId: country.id,
                            },
                        },
                        ...(isInternational !== undefined
                            ? {
                                packageType: isInternational ? 'international' : 'domestic',
                            }
                            : {}),
                    },
                });

                return {
                    id: country.id,
                    name: country.name,
                    packageCount,
                };
            })
        );

        return result.filter((c) => c.packageCount > 0);
    }

    /**
     * Get available states for a country (typically India for domestic packages)
     */
    async getAvailableStates(countryId: string): Promise<Array<{ id: string; name: string; packageCount: number }>> {
        const states = await prisma.state.findMany({
            where: {
                countryId,
                packagestates: {
                    some: {},
                },
            },
            orderBy: {
                name: 'asc',
            },
        });

        // If no states found via packagestates, try through packageCities
        if (states.length === 0) {
            const statesFromCities = await prisma.state.findMany({
                where: {
                    countryId,
                    packageCities: {
                        some: {},
                    },
                },
                orderBy: {
                    name: 'asc',
                },
            });

            const result = await Promise.all(
                statesFromCities.map(async (state) => {
                    const packageCount = await prisma.package.count({
                        where: {
                            packagecities: {
                                some: {
                                    stateId: state.id,
                                },
                            },
                        },
                    });

                    return {
                        id: state.id,
                        name: state.name,
                        packageCount,
                    };
                })
            );

            return result.filter((s) => s.packageCount > 0);
        }

        const result = await Promise.all(
            states.map(async (state) => {
                const packageCount = await prisma.package.count({
                    where: {
                        packagecities: {
                            some: {
                                stateId: state.id,
                            },
                        },
                    },
                });

                return {
                    id: state.id,
                    name: state.name,
                    packageCount,
                };
            })
        );

        return result.filter((s) => s.packageCount > 0);
    }

    /**
     * Get available cities based on country and optionally state
     */
    async getAvailableCities(countryId: string, stateId?: string): Promise<Array<{ id: string; name: string; packageCount: number }>> {
        const whereClause: any = {
            countryId,
            packageCities: {
                some: {},
            },
        };

        if (stateId) {
            whereClause.stateId = stateId;
        }

        const cities = await prisma.city.findMany({
            where: whereClause,
            orderBy: {
                name: 'asc',
            },
        });

        const result = await Promise.all(
            cities.map(async (city) => {
                const packageCount = await prisma.package.count({
                    where: {
                        packagecities: {
                            some: {
                                cityId: city.id,
                                ...(stateId ? { stateId } : {}),
                            },
                        },
                    },
                });

                return {
                    id: city.id,
                    name: city.name,
                    packageCount,
                };
            })
        );

        return result.filter((c) => c.packageCount > 0);
    }
}
