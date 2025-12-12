import { Router } from 'express';
import { RoomTypeController } from '../controllers/roomtype.controller';
import { container } from 'tsyringe';

const router = Router();
const roomtypeController = container.resolve(RoomTypeController);

router.get('/roomtype/', roomtypeController.getAll);
router.get('/roomtype/search', roomtypeController.search);
router.get('/roomtype/:id', roomtypeController.getById);
router.post('/roomtype/', roomtypeController.create);
router.put('/roomtype/:id', roomtypeController.update);
router.delete('/roomtype/:id', roomtypeController.delete);

export default router;
