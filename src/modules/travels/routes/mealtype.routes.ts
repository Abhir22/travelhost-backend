import { Router } from 'express';
import { container } from 'tsyringe';
import { MealTypeController } from '@/modules/travels/controllers/mealtype.controller';

const mealTypeRouter = Router();
const mealTypeController = container.resolve(MealTypeController);

mealTypeRouter.post('/mealtype', mealTypeController.create);
mealTypeRouter.get('/mealtype', mealTypeController.getAll);
mealTypeRouter.get('/mealtype/search', mealTypeController.search);
mealTypeRouter.get('/mealtype/:id', mealTypeController.getById);
mealTypeRouter.patch('/mealtype/:id', mealTypeController.update);
mealTypeRouter.delete('/mealtype/:id', mealTypeController.delete);

export default mealTypeRouter;
