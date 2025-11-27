import { Router } from 'express';
import { SightseeingController } from '../controllers/sightseeing.controller';
import { container } from 'tsyringe';

const router = Router();
const sightseeingController = container.resolve(SightseeingController);

router.get('/sightseeing/', sightseeingController.findWithPagination);
router.get('/sightseeing/search', sightseeingController.search);
router.get('/sightseeing/:id', sightseeingController.getById);
router.post('/sightseeing/', sightseeingController.create);
router.put('/sightseeing/:id', sightseeingController.update);
router.delete('/sightseeing/:id', sightseeingController.delete);

export default router;
