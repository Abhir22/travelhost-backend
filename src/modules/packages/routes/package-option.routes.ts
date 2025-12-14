import { Router } from 'express';
import { container } from 'tsyringe';
import { PackageOptionController } from '../controllers/package-option.controller';

const router = Router();
const controller = container.resolve(PackageOptionController);

router.get('/package-option/', controller.findWithPagination);
router.get('/package-option/search', controller.search);
router.get('/package-option/:id', controller.getById);
router.post('/package-option/', controller.create);
router.put('/package-option/:id', controller.update);
router.delete('/package-option/:id', controller.delete);

export default router;
