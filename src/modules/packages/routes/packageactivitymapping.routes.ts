import { Router } from 'express';
import { PackageActivityMappingController } from '../controllers/packageactivitymapping.controller';
import { container } from 'tsyringe';

const router = Router();
const packageactivitymappingController = container.resolve(PackageActivityMappingController);

router.get('/packageactivitymapping/', packageactivitymappingController.findWithPagination);
router.get('/packageactivitymapping/search', packageactivitymappingController.search);
router.get('/packageactivitymapping/:id', packageactivitymappingController.getById);
router.post('/packageactivitymapping/', packageactivitymappingController.create);
router.put('/packageactivitymapping/:id', packageactivitymappingController.update);
router.delete('/packageactivitymapping/:id', packageactivitymappingController.delete);

export default router;
