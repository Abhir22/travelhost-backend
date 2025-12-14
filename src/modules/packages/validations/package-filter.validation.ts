import { z } from 'zod';

/**
 * Validation schema for package filter API
 * Supports filtering by:
 * - Package type (domestic/international)
 * - Location (country -> state/city for domestic, country -> city for international)
 * - Destination type (single/multi/all)
 */
export const packageFilterValidation = {
    filter: z.object({
        // Package type filter: 'domestic' | 'international'
        packageType: z.enum(['domestic', 'international']).optional(),

        // Country ID - for international packages or can be used to override India for domestic
        countryId: z.string().uuid().optional(),

        // State ID - only applicable for domestic packages (India)
        stateId: z.string().uuid().optional(),

        // City ID - applicable for both domestic and international
        cityId: z.string().uuid().optional(),

        // Destination type filter: 'single' | 'multi' | 'all'
        // single - packages with only one city
        // multi - packages with multiple cities
        // all - all packages regardless of destination count
        destinationType: z.enum(['single', 'multi', 'all']).optional().default('all'),

        // Pagination
        page: z.coerce.number().min(1).optional().default(1),
        pageSize: z.coerce.number().min(1).max(100).optional().default(10),
    }).refine((data) => {
        // If stateId is provided, packageType should be domestic or not provided
        if (data.stateId && data.packageType === 'international') {
            return false;
        }
        return true;
    }, {
        message: 'State filter is only applicable for domestic packages',
        path: ['stateId'],
    }),
};

export type PackageFilterInput = z.infer<typeof packageFilterValidation.filter>;
