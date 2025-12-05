import { Router } from 'express';
import { PackageDayController } from '../controllers/packageday.controller';
import { container } from 'tsyringe';

const router = Router();
const packagedayController = container.resolve(PackageDayController);

// Standard CRUD routes
router.get('/packageday/', packagedayController.findWithPagination);
router.get('/packageday/search', packagedayController.search);
router.get('/packageday/:id', packagedayController.getById);
router.post('/packageday/', packagedayController.create);
router.put('/packageday/:id', packagedayController.update);
router.delete('/packageday/:id', packagedayController.delete);

// Custom routes
router.post('/package/:packageId/days', packagedayController.addPackageDays); // 2️⃣ Add Package Days

export default router;
