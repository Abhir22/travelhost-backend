import { Router } from 'express';
import { TravelModeController } from '../controllers/travelmode.controller';
import { container } from 'tsyringe';

const router = Router();
const travelmodeController = container.resolve(TravelModeController);

router.get('/travelmode/', travelmodeController.findWithPagination);
router.get('/travelmode/search', travelmodeController.search);
router.get('/travelmode/:id', travelmodeController.getById);
router.post('/travelmode/', travelmodeController.create);
router.put('/travelmode/:id', travelmodeController.update);
router.delete('/travelmode/:id', travelmodeController.delete);

export default router;
