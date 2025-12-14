import { PaginatedResult } from '@/core/interfaces/paginated-result.interface';
import { PackageFilterInput } from '@/modules/packages/validations/package-filter.validation';
import { Package } from '@/modules/packages/entities/package.entity';

export interface PackageFilterResult {
    data: Package[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    filters: {
        packageType?: 'domestic' | 'international';
        countryId?: string;
        countryName?: string;
        stateId?: string;
        stateName?: string;
        cityId?: string;
        cityName?: string;
        destinationType: 'single' | 'multi' | 'all';
    };
}

export interface IPackageFilterService {
    /**
     * Filter packages based on various criteria
     * @param filters - Filter criteria including package type, location, and destination type
     * @returns Paginated filtered packages with applied filter information
     */
    filterPackages(filters: PackageFilterInput): Promise<PackageFilterResult>;

    /**
     * Get available countries for package filtering
     * @param isInternational - If true, get countries with international packages; if false, get countries with domestic packages
     */
    getAvailableCountries(isInternational?: boolean): Promise<Array<{ id: string; name: string; packageCount: number }>>;

    /**
     * Get available states for a country (typically India for domestic packages)
     * @param countryId - Country ID to filter states
     */
    getAvailableStates(countryId: string): Promise<Array<{ id: string; name: string; packageCount: number }>>;

    /**
     * Get available cities based on country and optionally state
     * @param countryId - Country ID to filter cities
     * @param stateId - Optional state ID to further filter cities
     */
    getAvailableCities(countryId: string, stateId?: string): Promise<Array<{ id: string; name: string; packageCount: number }>>;
}
