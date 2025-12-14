import { Router } from 'express';
import { container } from 'tsyringe';
import { PackageCompleteController } from '../controllers/package-complete.controller';
import { uploadMiddlewares } from '@/config/multer.config';

const router = Router();
const controller = container.resolve(PackageCompleteController);

/**
 * Package Complete Routes
 * Handles complete package creation with all related data and image uploads
 */

// Get complete package with all relations
router.get('/package-complete/:id', controller.getCompletePackage);

// Create complete package with images
// Accepts multipart/form-data with:
// - packageData: JSON string containing package data
// - images: Multiple image files (optional)
router.post(
  '/package-complete',
  uploadMiddlewares.image.array('images', 10), // Max 10 images
  controller.createCompletePackage
);

// Upload additional images to existing package
router.post(
  '/package-complete/:packageId/images',
  uploadMiddlewares.image.array('images', 10),
  controller.uploadPackageImages
);

export default router;