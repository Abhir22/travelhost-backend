import { Router } from 'express';
import { PackageFilterController } from '../controllers/package-filter.controller';
import { container } from 'tsyringe';

const router = Router();
const packageFilterController = container.resolve(PackageFilterController);

/**
 * Package Filter Routes
 * 
 * These routes provide filtering capabilities for packages based on:
 * - Package type (domestic/international)
 * - Location (country, state, city)
 * - Destination type (single/multi destination)
 */

// Main filter endpoint
// GET /api/packages/package/filter
// Query params: packageType, countryId, stateId, cityId, destinationType, page, pageSize
router.get('/package/filter', packageFilterController.filterPackages.bind(packageFilterController));

// Get available countries for filtering
// GET /api/packages/package/filter/countries?isInternational=true|false
router.get('/package/filter/countries', packageFilterController.getAvailableCountries.bind(packageFilterController));

// Get available states for a country (used for domestic packages, typically India)
// GET /api/packages/package/filter/states/:countryId
router.get('/package/filter/states/:countryId', packageFilterController.getAvailableStates.bind(packageFilterController));

// Get available cities for a country/state
// GET /api/packages/package/filter/cities/:countryId?stateId=xxx
router.get('/package/filter/cities/:countryId', packageFilterController.getAvailableCities.bind(packageFilterController));

export default router;
