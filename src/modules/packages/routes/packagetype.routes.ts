import { Router } from 'express';
import { PackageTypeController } from '../controllers/packagetype.controller';
import { container } from 'tsyringe';

const router = Router();
const packagetypeController = container.resolve(PackageTypeController);

router.get('/packagetype/', packagetypeController.findWithPagination);
router.get('/packagetype/search', packagetypeController.search);
router.get('/packagetype/:id', packagetypeController.getById);
router.post('/packagetype/', packagetypeController.create);
router.put('/packagetype/:id', packagetypeController.update);
router.delete('/packagetype/:id', packagetypeController.delete);

export default router;
