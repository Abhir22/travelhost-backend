import { Router } from 'express';
import { PackageCityDayTravelController } from '../controllers/packagecitydaytravel.controller';
import { container } from 'tsyringe';

const router = Router();
const packagecitydaytravelController = container.resolve(PackageCityDayTravelController);

router.get('/packagecitydaytravel/', packagecitydaytravelController.findWithPagination);
router.get('/packagecitydaytravel/search', packagecitydaytravelController.search);
router.get('/packagecitydaytravel/:id', packagecitydaytravelController.getById);
router.post('/packagecitydaytravel/', packagecitydaytravelController.create);
router.put('/packagecitydaytravel/:id', packagecitydaytravelController.update);
router.delete('/packagecitydaytravel/:id', packagecitydaytravelController.delete);

export default router;
