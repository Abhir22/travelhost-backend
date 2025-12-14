import { Router } from 'express';
import { container } from 'tsyringe';
import { PackageCancellationPolicyController } from '../controllers/package-cancellation-policy.controller';

const router = Router();
const controller = container.resolve(PackageCancellationPolicyController);

router.get('/package-cancellation-policy/', controller.findWithPagination);
router.get('/package-cancellation-policy/search', controller.search);
router.get('/package-cancellation-policy/:id', controller.getById);
router.post('/package-cancellation-policy/', controller.create);
router.put('/package-cancellation-policy/:id', controller.update);
router.delete('/package-cancellation-policy/:id', controller.delete);

export default router;
