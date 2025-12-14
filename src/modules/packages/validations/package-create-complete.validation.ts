import { z } from 'zod';
import { flatToNestedSchema } from '@/core/utils/flat-to-nested-schema';

// Meal type schema removed - meals handled at day level

// Travel schema
const travelSchema = z.object({
  type: z.string(),
  carpooling: z.string().optional(),
  vehicleType: z.string().optional(),
  timeFrom: z.string().optional(),
  timeTo: z.string().optional(),
  description: z.any().optional(),
});

// Sightseeing schema
const sightseeingSchema = z.object({
  sightseeingId: z.string(),
  ticket: z.string().optional(),       // Ticket info (e.g., "Entry fee included", "500 INR per person")
  timeFrom: z.string().optional(),     // Visit start time
  timeTo: z.string().optional(),       // Visit end time
  description: z.string().optional(),
});

// Hotel schema
const hotelSchema = z.object({
  hotelId: z.string(),
  hotelType: z.string().optional(),           // Hotel type (e.g., "Luxury", "Resort", "Budget")
  roomType: z.string().optional(),            // Room type (e.g., "Deluxe Room", "Suite")
  starRating: z.number().int().min(1).max(5).optional(),  // Star rating (1-5)
  checkIn: z.string().optional(),             // Check-in time
  checkOut: z.string().optional(),            // Check-out time
  numberOfRooms: z.number().int().positive().optional(),  // Number of rooms
  description: z.string().optional(),
});

// Meal schema
const mealSchema = z.object({
  mealTypeId: z.string(),
  mealCategoryId: z.string().optional(),      // Meal category (e.g., breakfast, lunch, dinner)
  provider: z.string().optional(),            // Meal provider (e.g., "Hotel Restaurant", "Local Eatery")
  time: z.string().optional(),                // Meal time
  description: z.string().optional(),
});

// Package city day schema
const packageCityDaySchema = z.object({
  dayNumber: z.number().int().positive(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  startFrom: z.string().optional(),
  endAt: z.string().optional(),
  startAtDescription: z.string().optional(),  // Description for start of day
  endAtDescription: z.string().optional(),    // Description for end of day
  travels: z.array(travelSchema).optional(),
  sightseeings: z.array(sightseeingSchema).optional(),
  hotels: z.array(hotelSchema).optional(),
  meals: z.array(mealSchema).optional(),
});

// Package city schema
const packageCitySchema = z.object({
  cityId: z.string(),
  days: z.array(packageCityDaySchema),
});

// Package category mapping schema
const packageCategoryMappingSchema = z.object({
  packageCategoryId: z.string(),
});

// Package activity mapping schema
const packageActivityMappingSchema = z.object({
  packageActivityId: z.string(),
});

// Package snapshot mapping schema
const packageSnapshotMappingSchema = z.object({
  packageSnapshotId: z.string(),
});

// Package pricing schema
const packagePricingSchema = z.object({
  season: z.enum(['ON_SEASON', 'OFF_SEASON', 'MID_SEASON', 'FESTIVE_SEASON']).default('ON_SEASON'),
  dateFrom: z.string().or(z.date()),
  dateTo: z.string().or(z.date()),
  rackRate: z.number().min(0),
  publishedRate: z.number().min(0),
  customerDiscountPercentage: z.number().min(0).max(100).optional(),
  customerDiscountAmount: z.number().min(0).optional(),
  adultRate: z.number().positive().optional(),
  agentDiscountPercentage: z.number().min(0).max(100).optional(),
  agentDiscountAmount: z.number().min(0).optional(),
  agentRate: z.number().min(0).optional(),
  childRate: z.number().min(0).optional(),
  infantRate:z.number().min(0).optional(),
  createdBy: z.string().optional(),
});

// Package terms condition schema
const packageTermsConditionSchema = z.object({
  content: z.string().min(1),
  linkText: z.string().optional(),
  linkUrl: z.string().url().optional(),
  videoUrl: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
  fileName: z.string().optional(),
  filePath: z.string().optional(),
  fileType: z.string().optional(),
  fileSize: z.number().optional(),
  createdBy: z.string().optional(),
});

// Package inclusion schema
const packageInclusionSchema = z.object({
  content: z.string().min(1),
  createdBy: z.string().optional(),
});

// Package exclusion schema
const packageExclusionSchema = z.object({
  content: z.string().min(1),
  createdBy: z.string().optional(),
});

// Package payment policy schema
const packagePaymentPolicySchema = z.object({
  content: z.string().min(1),
  createdBy: z.string().optional(),
});

// Package cancellation policy schema
const packageCancellationPolicySchema = z.object({
  content: z.string().min(1),
  createdBy: z.string().optional(),
});

// Package options schema
const packageOptionsSchema = z.object({
  includeGroupDeparture: z.boolean().default(false),
  includeFixedDeparture: z.boolean().default(false),
  includePackageAvailability: z.boolean().default(false),
});

// Package policies container schema
const packagePoliciesSchema = z.object({
  termsConditions: z.array(packageTermsConditionSchema).optional(),
  inclusions: z.array(packageInclusionSchema).optional(),
  exclusions: z.array(packageExclusionSchema).optional(),
  paymentPolicies: z.array(packagePaymentPolicySchema).optional(),
  cancellationPolicies: z.array(packageCancellationPolicySchema).optional(),
});

// Main package creation schema
export const createCompletePackageSchema = flatToNestedSchema(
  z.object({
    // Basic package info
    packageName: z.string().min(1),
    description: z.string().optional(),
    shortDescription: z.string().optional(),
    longDescription: z.string().optional(),
    mainImage: z.string().url().optional(),
    thumbnail: z.string().url().optional(),
    video: z.string().url().optional(),
    packageTypeId: z.string(),
    duration: z.string().optional(),
    price: z.number().positive().optional(),
    maxPeople: z.number().int().positive().optional(),
    minPeople: z.number().int().positive().optional(),
    isActive: z.boolean().optional().default(true),

    // Package meal types removed - meals handled at day level

    // Package categories
    categories: z.array(packageCategoryMappingSchema).optional(),

    // Package activities
    activities: z.array(packageActivityMappingSchema).optional(),

    // Package snapshots
    snapshots: z.array(packageSnapshotMappingSchema).optional(),

    // Package cities with their days and details
    cities: z.array(packageCitySchema).min(1),

    // Package pricing
    pricing: z.array(packagePricingSchema).optional(),

    // Package policies
    policies: packagePoliciesSchema.optional(),

    // Package options
    options: packageOptionsSchema.optional(),
  }),
  data => ({
    packageName: data.packageName,
    ...(data.description !== undefined ? { description: data.description } : {}),
    ...(data.shortDescription !== undefined ? { shortDescription: data.shortDescription } : {}),
    ...(data.longDescription !== undefined ? { longDescription: data.longDescription } : {}),
    ...(data.mainImage !== undefined ? { mainImage: data.mainImage } : {}),
    ...(data.thumbnail !== undefined ? { thumbnail: data.thumbnail } : {}),
    ...(data.video !== undefined ? { video: data.video } : {}),
    packageTypeId: data.packageTypeId,
    ...(data.duration !== undefined ? { duration: data.duration } : {}),
    ...(data.price !== undefined ? { price: data.price } : {}),
    ...(data.maxPeople !== undefined ? { maxPeople: data.maxPeople } : {}),
    ...(data.minPeople !== undefined ? { minPeople: data.minPeople } : {}),
    ...(data.isActive !== undefined ? { isActive: data.isActive } : {}),
    ...(data.categories ? { categories: data.categories } : {}),
    ...(data.activities ? { activities: data.activities } : {}),
    ...(data.snapshots ? { snapshots: data.snapshots } : {}),
    cities: data.cities,
    ...(data.pricing ? { pricing: data.pricing } : {}),
    ...(data.policies ? { policies: data.policies } : {}),
    ...(data.options ? { options: data.options } : {}),
  })
);

export const packageCompleteValidation = {
  createComplete: createCompletePackageSchema,
};