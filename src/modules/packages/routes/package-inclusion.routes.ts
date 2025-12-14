import { Router } from 'express';
import { container } from 'tsyringe';
import { PackageInclusionController } from '../controllers/package-inclusion.controller';

const router = Router();
const controller = container.resolve(PackageInclusionController);

router.get('/package-inclusion/', controller.findWithPagination);
router.get('/package-inclusion/search', controller.search);
router.get('/package-inclusion/:id', controller.getById);
router.post('/package-inclusion/', controller.create);
router.put('/package-inclusion/:id', controller.update);
router.delete('/package-inclusion/:id', controller.delete);

export default router;
