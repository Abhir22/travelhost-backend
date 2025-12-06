import { Router } from 'express';
import { PackageCityDayHotelController } from '../controllers/packagecitydayhotel.controller';
import { container } from 'tsyringe';

const router = Router();
const packagecitydayhotelController = container.resolve(PackageCityDayHotelController);

router.get('/packagecitydayhotel/', packagecitydayhotelController.findWithPagination);
router.get('/packagecitydayhotel/search', packagecitydayhotelController.search);
router.get('/packagecitydayhotel/:id', packagecitydayhotelController.getById);
router.post('/packagecitydayhotel/', packagecitydayhotelController.create);
router.put('/packagecitydayhotel/:id', packagecitydayhotelController.update);
router.delete('/packagecitydayhotel/:id', packagecitydayhotelController.delete);

export default router;
