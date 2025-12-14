import { Router } from 'express';
import { container } from 'tsyringe';
import { PackageCityDayMealTypeController } from '@/modules/packages/controllers/packagecitydaymealtype.controller';

const packageCityDayMealTypeRouter = Router();
const packageCityDayMealTypeController = container.resolve(PackageCityDayMealTypeController);

packageCityDayMealTypeRouter.get('/packagecitydaymealtype/', packageCityDayMealTypeController.findWithPagination.bind(packageCityDayMealTypeController));
packageCityDayMealTypeRouter.get('/packagecitydaymealtype/search', packageCityDayMealTypeController.search.bind(packageCityDayMealTypeController));
packageCityDayMealTypeRouter.get('/packagecitydaymealtype/:id', packageCityDayMealTypeController.getById.bind(packageCityDayMealTypeController));
packageCityDayMealTypeRouter.post('/packagecitydaymealtype/', packageCityDayMealTypeController.create.bind(packageCityDayMealTypeController));
packageCityDayMealTypeRouter.put('/packagecitydaymealtype/:id', packageCityDayMealTypeController.update.bind(packageCityDayMealTypeController));
packageCityDayMealTypeRouter.delete('/packagecitydaymealtype/:id', packageCityDayMealTypeController.delete.bind(packageCityDayMealTypeController));

export default packageCityDayMealTypeRouter;