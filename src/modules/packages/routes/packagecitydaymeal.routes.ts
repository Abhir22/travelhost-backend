import { Router } from 'express';
import { PackageCityDayMealController } from '../controllers/packagecitydaymeal.controller';
import { container } from 'tsyringe';

const router = Router();
const packagecitydaymealController = container.resolve(PackageCityDayMealController);

router.get('/packagecitydaymeal/', packagecitydaymealController.findWithPagination);
router.get('/packagecitydaymeal/search', packagecitydaymealController.search);
router.get('/packagecitydaymeal/:id', packagecitydaymealController.getById);
router.post('/packagecitydaymeal/', packagecitydaymealController.create);
router.put('/packagecitydaymeal/:id', packagecitydaymealController.update);
router.delete('/packagecitydaymeal/:id', packagecitydaymealController.delete);

export default router;
