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
  description: z.string().optional(),
});

// Hotel schema
const hotelSchema = z.object({
  hotelId: z.string(),
  roomType: z.string().optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  description: z.string().optional(),
});

// Meal schema
const mealSchema = z.object({
  mealTypeId: z.string(),
  description: z.string().optional(),
});

// Package city day schema
const packageCityDaySchema = z.object({
  dayNumber: z.number().int().positive(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  startFrom: z.string().optional(),
  endAt: z.string().optional(),
  description: z.string().optional(),
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
    duration: z.number().int().positive().optional(),
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
  })
);

export const packageCompleteValidation = {
  createComplete: createCompletePackageSchema,
};