import { Router } from 'express';
import { PackageDayTravelTypeController } from '../controllers/packagedaytraveltype.controller';
import { container } from 'tsyringe';

const router = Router();
const packagedaytraveltypeController = container.resolve(PackageDayTravelTypeController);

// Standard CRUD routes
router.get('/packagedaytraveltype/', packagedaytraveltypeController.findWithPagination);
router.get('/packagedaytraveltype/search', packagedaytraveltypeController.search);
router.get('/packagedaytraveltype/:id', packagedaytraveltypeController.getById);
router.post('/packagedaytraveltype/', packagedaytraveltypeController.create);
router.put('/packagedaytraveltype/:id', packagedaytraveltypeController.update);
router.delete('/packagedaytraveltype/:id', packagedaytraveltypeController.delete);

// Custom routes
router.post('/packagedaytraveltype/add', packagedaytraveltypeController.addTravelType); // 3️⃣ Add Travel Type

export default router;
