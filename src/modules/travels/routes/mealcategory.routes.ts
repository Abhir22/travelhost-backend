import { Router } from 'express';
import { container } from 'tsyringe';
import { MealCategoryController } from '@/modules/travels/controllers/mealcategory.controller';

const mealCategoryRouter = Router();
const mealCategoryController = container.resolve(MealCategoryController);

mealCategoryRouter.get('/mealcategory/', mealCategoryController.findWithPagination);
mealCategoryRouter.get('/mealcategory/search', mealCategoryController.search);
mealCategoryRouter.get('/mealcategory/:id', mealCategoryController.getById);
mealCategoryRouter.post('/mealcategory/', mealCategoryController.create);
mealCategoryRouter.put('/mealcategory/:id', mealCategoryController.update);
mealCategoryRouter.delete('/mealcategory/:id', mealCategoryController.delete);

export default mealCategoryRouter;