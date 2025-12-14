import { Router } from 'express';
import { container } from 'tsyringe';
import { PackageGalleryController } from '../controllers/package-gallery.controller';

const router = Router();
const controller = container.resolve(PackageGalleryController);

router.get('/package-gallery/', controller.findWithPagination);
router.get('/package-gallery/search', controller.search);
router.get('/package-gallery/:id', controller.getById);
router.post('/package-gallery/', controller.create);
router.put('/package-gallery/:id', controller.update);
router.delete('/package-gallery/:id', controller.delete);

export default router;
