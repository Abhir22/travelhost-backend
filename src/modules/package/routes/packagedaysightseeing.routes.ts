import { Router } from 'express';
import { PackageDaySightseeingController } from '../controllers/packagedaysightseeing.controller';
import { container } from 'tsyringe';

const router = Router();
const packagedaysightseeingController = container.resolve(PackageDaySightseeingController);

// Standard CRUD routes
router.get('/packagedaysightseeing/', packagedaysightseeingController.findWithPagination);
router.get('/packagedaysightseeing/search', packagedaysightseeingController.search);
router.get('/packagedaysightseeing/:id', packagedaysightseeingController.getById);
router.post('/packagedaysightseeing/', packagedaysightseeingController.create);
router.put('/packagedaysightseeing/:id', packagedaysightseeingController.update);
router.delete('/packagedaysightseeing/:id', packagedaysightseeingController.delete);

// Custom routes
router.post('/packagedaysightseeing/add', packagedaysightseeingController.addSightseeing); // 4️⃣ Add Sightseeing

export default router;
