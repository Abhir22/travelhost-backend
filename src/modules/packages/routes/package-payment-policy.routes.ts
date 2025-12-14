import { Router } from 'express';
import { container } from 'tsyringe';
import { PackagePaymentPolicyController } from '../controllers/package-payment-policy.controller';

const router = Router();
const controller = container.resolve(PackagePaymentPolicyController);

router.get('/package-payment-policy/', controller.findWithPagination);
router.get('/package-payment-policy/search', controller.search);
router.get('/package-payment-policy/:id', controller.getById);
router.post('/package-payment-policy/', controller.create);
router.put('/package-payment-policy/:id', controller.update);
router.delete('/package-payment-policy/:id', controller.delete);

export default router;
