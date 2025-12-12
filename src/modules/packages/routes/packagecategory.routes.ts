import { Router } from 'express';
import { PackageCategoryController } from '../controllers/packagecategory.controller';
import { container } from 'tsyringe';

const router = Router();
const packagecategoryController = container.resolve(PackageCategoryController);

router.get('/packagecategory/', packagecategoryController.getAll);
router.get('/packagecategory/search', packagecategoryController.search);
router.get('/packagecategory/:id', packagecategoryController.getById);
router.post('/packagecategory/', packagecategoryController.create);
router.put('/packagecategory/:id', packagecategoryController.update);
router.delete('/packagecategory/:id', packagecategoryController.delete);

export default router;
