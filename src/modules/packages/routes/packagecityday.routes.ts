import { Router } from 'express';
import { PackageCityDayController } from '../controllers/packagecityday.controller';
import { container } from 'tsyringe';

const router = Router();
const packagecitydayController = container.resolve(PackageCityDayController);

router.get('/packagecityday/', packagecitydayController.findWithPagination);
router.get('/packagecityday/search', packagecitydayController.search);
router.get('/packagecityday/:id', packagecitydayController.getById);
router.post('/packagecityday/', packagecitydayController.create);
router.put('/packagecityday/:id', packagecitydayController.update);
router.delete('/packagecityday/:id', packagecitydayController.delete);

export default router;
