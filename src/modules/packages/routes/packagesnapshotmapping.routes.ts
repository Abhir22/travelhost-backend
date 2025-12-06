import { Router } from 'express';
import { PackageSnapshotMappingController } from '../controllers/packagesnapshotmapping.controller';
import { container } from 'tsyringe';

const router = Router();
const packagesnapshotmappingController = container.resolve(PackageSnapshotMappingController);

router.get('/packagesnapshotmapping/', packagesnapshotmappingController.findWithPagination);
router.get('/packagesnapshotmapping/search', packagesnapshotmappingController.search);
router.get('/packagesnapshotmapping/:id', packagesnapshotmappingController.getById);
router.post('/packagesnapshotmapping/', packagesnapshotmappingController.create);
router.put('/packagesnapshotmapping/:id', packagesnapshotmappingController.update);
router.delete('/packagesnapshotmapping/:id', packagesnapshotmappingController.delete);

export default router;
