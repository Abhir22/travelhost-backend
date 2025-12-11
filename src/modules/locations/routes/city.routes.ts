import { Router } from 'express';
import { CityController } from '../controllers/city.controller';
import { container } from 'tsyringe';

const router = Router();
const cityController = container.resolve(CityController);

router.get('/city/', cityController.findWithPagination);
router.get('/city/all', cityController.getAll);
router.get('/city/search', cityController.search);
router.get('/city/:id', cityController.getById);
router.post('/city/', cityController.create);
router.put('/city/:id', cityController.update);
router.delete('/city/:id', cityController.delete);

export default router;
