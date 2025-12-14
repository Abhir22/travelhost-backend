import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { asyncHandler } from '@/core/middlewares/error.middleware';
import { SuccessResponse, PaginatedResponse } from '@/core/utils/api-response';
import { ValidationUtil } from '@/core/utils/validate-and-transform';
import { BadRequestException } from '@/core/exceptions/http.exception';
import { IPackageFilterService, PackageFilterResult } from '@/modules/packages/services/interfaces/package-filter.service.interface';
import { packageFilterValidation, PackageFilterInput } from '@/modules/packages/validations/package-filter.validation';
import { PackageResponse } from '@/modules/packages/dtos/package-response.dto';
import { BaseResponse } from '@/core/base/response/base.response';

@injectable()
export class PackageFilterController {
    constructor(
        @inject('IPackageFilterService') private packageFilterService: IPackageFilterService
    ) { }

    /**
     * Filter packages by type, location and destination type
     * GET /api/packages/package/filter
     * 
     * Query params:
     * - packageType: 'domestic' | 'international'
     * - countryId: UUID (optional for international, defaults to India for domestic)
     * - stateId: UUID (only for domestic)
     * - cityId: UUID
     * - destinationType: 'single' | 'multi' | 'all'
     * - page: number
     * - pageSize: number
     */
    filterPackages = asyncHandler(async (req: Request, res: Response) => {
        // Validate and transform query parameters
        const filters = ValidationUtil.validate(
            req.query,
            packageFilterValidation.filter
        ) as PackageFilterInput;

        // Get filtered packages
        const result = await this.packageFilterService.filterPackages(filters);

        // Transform response
        const responseData = result.data.map((pkg: any) => new PackageResponse(pkg));

        return PaginatedResponse.paginated(
            responseData,
            result.page,
            result.pageSize,
            result.total,
            `Found ${result.total} packages with applied filters`
        ).send(res);
    });

    /**
     * Get filter options - available countries
     * GET /api/packages/package/filter/countries
     * 
     * Query params:
     * - isInternational: 'true' | 'false' (optional)
     */
    getAvailableCountries = asyncHandler(async (req: Request, res: Response) => {
        const { isInternational } = req.query;

        let isInternationalFilter: boolean | undefined;
        if (isInternational === 'true') {
            isInternationalFilter = true;
        } else if (isInternational === 'false') {
            isInternationalFilter = false;
        }

        const countries = await this.packageFilterService.getAvailableCountries(isInternationalFilter);

        return SuccessResponse.get(
            countries,
            `Found ${countries.length} countries with packages`
        ).send(res);
    });

    /**
     * Get filter options - available states for a country
     * GET /api/packages/package/filter/states/:countryId
     */
    getAvailableStates = asyncHandler(async (req: Request, res: Response) => {
        const { countryId } = req.params;

        if (!countryId) {
            throw new BadRequestException('Country ID is required');
        }

        const states = await this.packageFilterService.getAvailableStates(countryId);

        return SuccessResponse.get(
            states,
            `Found ${states.length} states with packages in the specified country`
        ).send(res);
    });

    /**
     * Get filter options - available cities for a country/state
     * GET /api/packages/package/filter/cities/:countryId
     * 
     * Query params:
     * - stateId: UUID (optional, for domestic packages)
     */
    getAvailableCities = asyncHandler(async (req: Request, res: Response) => {
        const { countryId } = req.params;
        const { stateId } = req.query;

        if (!countryId) {
            throw new BadRequestException('Country ID is required');
        }

        const cities = await this.packageFilterService.getAvailableCities(
            countryId,
            typeof stateId === 'string' ? stateId : undefined
        );

        return SuccessResponse.get(
            cities,
            `Found ${cities.length} cities with packages`
        ).send(res);
    });
}
