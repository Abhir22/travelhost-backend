import { Router } from 'express';
import { PackageSnapshotController } from '../controllers/packagesnapshot.controller';
import { container } from 'tsyringe';

const router = Router();
const packagesnapshotController = container.resolve(PackageSnapshotController);

router.get('/packagesnapshot/', packagesnapshotController.getAll);
router.get('/packagesnapshot/search', packagesnapshotController.search);
router.get('/packagesnapshot/:id', packagesnapshotController.getById);
router.post('/packagesnapshot/', packagesnapshotController.create);
router.put('/packagesnapshot/:id', packagesnapshotController.update);
router.delete('/packagesnapshot/:id', packagesnapshotController.delete);

export default router;
