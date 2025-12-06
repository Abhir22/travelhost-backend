import { Router } from 'express';
import { PackageActivityController } from '../controllers/packageactivity.controller';
import { container } from 'tsyringe';

const router = Router();
const packageactivityController = container.resolve(PackageActivityController);

router.get('/packageactivity/', packageactivityController.findWithPagination);
router.get('/packageactivity/search', packageactivityController.search);
router.get('/packageactivity/:id', packageactivityController.getById);
router.post('/packageactivity/', packageactivityController.create);
router.put('/packageactivity/:id', packageactivityController.update);
router.delete('/packageactivity/:id', packageactivityController.delete);

export default router;
