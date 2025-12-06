import { Router } from 'express';
import { PackageCityController } from '../controllers/packagecity.controller';
import { container } from 'tsyringe';

const router = Router();
const packagecityController = container.resolve(PackageCityController);

router.get('/packagecity/', packagecityController.findWithPagination);
router.get('/packagecity/search', packagecityController.search);
router.get('/packagecity/:id', packagecityController.getById);
router.post('/packagecity/', packagecityController.create);
router.put('/packagecity/:id', packagecityController.update);
router.delete('/packagecity/:id', packagecityController.delete);

export default router;
