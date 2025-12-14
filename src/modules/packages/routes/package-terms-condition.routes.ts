import { Router } from 'express';
import { container } from 'tsyringe';
import { PackageTermsConditionController } from '../controllers/package-terms-condition.controller';

const router = Router();
const controller = container.resolve(PackageTermsConditionController);

router.get('/package-terms-condition/', controller.findWithPagination);
router.get('/package-terms-condition/search', controller.search);
router.get('/package-terms-condition/:id', controller.getById);
router.post('/package-terms-condition/', controller.create);
router.put('/package-terms-condition/:id', controller.update);
router.delete('/package-terms-condition/:id', controller.delete);

export default router;
