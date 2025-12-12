import { Router } from 'express';
import { HotelTypeController } from '../controllers/hoteltype.controller';
import { container } from 'tsyringe';

const router = Router();
const hoteltypeController = container.resolve(HotelTypeController);

router.get('/hoteltype/', hoteltypeController.getAll);
router.get('/hoteltype/search', hoteltypeController.search);
router.get('/hoteltype/:id', hoteltypeController.getById);
router.post('/hoteltype/', hoteltypeController.create);
router.put('/hoteltype/:id', hoteltypeController.update);
router.delete('/hoteltype/:id', hoteltypeController.delete);

export default router;
