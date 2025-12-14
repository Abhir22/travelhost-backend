import { Router } from 'express';
import { container } from 'tsyringe';
import { PackageExclusionController } from '../controllers/package-exclusion.controller';

const router = Router();
const controller = container.resolve(PackageExclusionController);

router.get('/package-exclusion/', controller.findWithPagination);
router.get('/package-exclusion/search', controller.search);
router.get('/package-exclusion/:id', controller.getById);
router.post('/package-exclusion/', controller.create);
router.put('/package-exclusion/:id', controller.update);
router.delete('/package-exclusion/:id', controller.delete);

export default router;
