import { Router } from 'express';
import { TravelTypeController } from '../controllers/traveltype.controller';
import { container } from 'tsyringe';

const router = Router();
const traveltypeController = container.resolve(TravelTypeController);

router.get('/traveltype/', traveltypeController.findWithPagination);
router.get('/traveltype/search', traveltypeController.search);
router.get('/traveltype/:id', traveltypeController.getById);
router.post('/traveltype/', traveltypeController.create);
router.put('/traveltype/:id', traveltypeController.update);
router.delete('/traveltype/:id', traveltypeController.delete);

export default router;
