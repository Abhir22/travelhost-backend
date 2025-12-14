import { Router } from 'express';
import { container } from 'tsyringe';
import { PackagePricingController } from '../controllers/package-pricing.controller';

const router = Router();
const controller = container.resolve(PackagePricingController);

router.get('/package-pricing/', controller.findWithPagination);
router.get('/package-pricing/search', controller.search);
router.get('/package-pricing/:id', controller.getById);
router.post('/package-pricing/', controller.create);
router.put('/package-pricing/:id', controller.update);
router.delete('/package-pricing/:id', controller.delete);

export default router;
