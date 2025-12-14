import { Router } from 'express';
import { PackageController } from '../controllers/package.controller';
import { PackageCompleteController } from '../controllers/package-complete.controller';
import { container } from 'tsyringe';

const router = Router();
const packageController = container.resolve(PackageController);
const packageCompleteController = container.resolve(PackageCompleteController);

router.get('/package/', packageController.findWithPagination.bind(packageController));
router.get('/package/search', packageController.search.bind(packageController));
router.get('/package/:id', packageController.getById.bind(packageController));
router.get('/package/:id/complete', packageCompleteController.getCompletePackage.bind(packageCompleteController));
router.post('/package/', packageController.create.bind(packageController));
router.post('/package/complete', packageCompleteController.createCompletePackage.bind(packageCompleteController));
router.put('/package/:id', packageController.update.bind(packageController));
router.delete('/package/:id', packageController.delete.bind(packageController));

export default router;
