import { Router } from 'express';
import { PackageCityDaySightseeingController } from '../controllers/packagecitydaysightseeing.controller';
import { container } from 'tsyringe';

const router = Router();
const packagecitydaysightseeingController = container.resolve(PackageCityDaySightseeingController);

router.get('/packagecitydaysightseeing/', packagecitydaysightseeingController.findWithPagination);
router.get('/packagecitydaysightseeing/search', packagecitydaysightseeingController.search);
router.get('/packagecitydaysightseeing/:id', packagecitydaysightseeingController.getById);
router.post('/packagecitydaysightseeing/', packagecitydaysightseeingController.create);
router.put('/packagecitydaysightseeing/:id', packagecitydaysightseeingController.update);
router.delete('/packagecitydaysightseeing/:id', packagecitydaysightseeingController.delete);

export default router;
