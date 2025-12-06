import { Router } from 'express';
import { PackageController } from '../controllers/package.controller';
import { container } from 'tsyringe';

const router = Router();
const packageController = container.resolve(PackageController);

router.get('/package/', packageController.findWithPagination);
router.get('/package/search', packageController.search);
router.get('/package/:id', packageController.getById);
router.post('/package/', packageController.create);
router.put('/package/:id', packageController.update);
router.delete('/package/:id', packageController.delete);

export default router;
