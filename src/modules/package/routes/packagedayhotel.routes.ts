import { Router } from 'express';
import { PackageDayHotelController } from '../controllers/packagedayhotel.controller';
import { container } from 'tsyringe';

const router = Router();
const packagedayhotelController = container.resolve(PackageDayHotelController);

// Standard CRUD routes
router.get('/packagedayhotel/', packagedayhotelController.findWithPagination);
router.get('/packagedayhotel/search', packagedayhotelController.search);
router.get('/packagedayhotel/:id', packagedayhotelController.getById);
router.post('/packagedayhotel/', packagedayhotelController.create);
router.put('/packagedayhotel/:id', packagedayhotelController.update);
router.delete('/packagedayhotel/:id', packagedayhotelController.delete);

// Custom routes
router.post('/packagedayhotel/add', packagedayhotelController.addHotel); // 5️⃣ Add Hotel

export default router;
