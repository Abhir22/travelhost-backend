import { Router } from 'express';
import { HotelController } from '../../hotels/controllers/hotel.controller';
import { container } from 'tsyringe';

const router = Router();
const hotelController = container.resolve(HotelController);

router.get('/hotel/', hotelController.findWithPagination);
router.get('/hotel/search', hotelController.search);
router.get('/hotel/:id', hotelController.getById);
router.post('/hotel/', hotelController.create);
router.put('/hotel/:id', hotelController.update);
router.delete('/hotel/:id', hotelController.delete);

export default router;
