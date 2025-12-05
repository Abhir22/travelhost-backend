import { Router } from 'express';
import { PackageController } from '../controllers/package.controller';
import { container } from 'tsyringe';

const router = Router();
const packageController = container.resolve(PackageController);

// Standard CRUD routes
router.get('/package/', packageController.findWithPagination);
router.get('/package/search', packageController.search);
router.get('/package/:id', packageController.getById);
router.post('/package/', packageController.create);
router.put('/package/:id', packageController.update);
router.delete('/package/:id', packageController.delete);

// Custom routes for package operations
router.post('/package/create', packageController.createPackage); // 1️⃣ Create Package
router.get('/package/:id/full', packageController.getFullPackage); // 6️⃣ Get Full Package
router.delete('/package/:id/full', packageController.deletePackage); // 7️⃣ Delete Package with cascade
router.put('/package/:id/update', packageController.updatePackage); // 8️⃣ Update Package
router.post('/package/full', packageController.createFullPackage); // 9️⃣ Create Full Package with days

export default router;
