import { Router } from 'express';
import { PackageCategoryMappingController } from '../controllers/packagecategorymapping.controller';
import { container } from 'tsyringe';

const router = Router();
const packagecategorymappingController = container.resolve(PackageCategoryMappingController);

router.get('/packagecategorymapping/', packagecategorymappingController.findWithPagination);
router.get('/packagecategorymapping/search', packagecategorymappingController.search);
router.get('/packagecategorymapping/:id', packagecategorymappingController.getById);
router.post('/packagecategorymapping/', packagecategorymappingController.create);
router.put('/packagecategorymapping/:id', packagecategorymappingController.update);
router.delete('/packagecategorymapping/:id', packagecategorymappingController.delete);

export default router;
