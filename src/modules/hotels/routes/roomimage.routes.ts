import { Router } from 'express';
import { RoomImageController } from '../controllers/roomimage.controller';
import { container } from 'tsyringe';

const router = Router();
const roomimageController = container.resolve(RoomImageController);

router.get('/roomimage/', roomimageController.findWithPagination);
router.get('/roomimage/search', roomimageController.search);
router.get('/roomimage/:id', roomimageController.getById);
router.post('/roomimage/', roomimageController.create);
router.put('/roomimage/:id', roomimageController.update);
router.delete('/roomimage/:id', roomimageController.delete);

export default router;
