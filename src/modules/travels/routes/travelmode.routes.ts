import { Router } from 'express';
import { TravelModeController } from '../controllers/travelmode.controller';
import { container } from 'tsyringe';

const router = Router();
const travelmodeController = container.resolve(TravelModeController);

router.get('/transfermode/', travelmodeController.findWithPagination);
router.get('/transfermode/search', travelmodeController.search);
router.get('/transfermode/:id', travelmodeController.getById);
router.post('/transfermode/', travelmodeController.create);
router.put('/transfermode/:id', travelmodeController.update);
router.delete('/transfermode/:id', travelmodeController.delete);

export default router;
