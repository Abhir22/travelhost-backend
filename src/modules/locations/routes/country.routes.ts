import { Router } from 'express';
import { CountryController } from '../controllers/country.controller';
import { container } from 'tsyringe';

const router = Router();
const countryController = container.resolve(CountryController);

router.get('/country/', countryController.findWithPagination);
router.get('/country/search', countryController.search);
router.get('/country/:id', countryController.getById);
router.post('/country/', countryController.create);
router.put('/country/:id', countryController.update);
router.delete('/country/:id', countryController.delete);

export default router;
