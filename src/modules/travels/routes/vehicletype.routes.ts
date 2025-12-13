import { Router } from 'express';
import { VehicleTypeController } from '../controllers/vehicletype.controller';
import { container } from 'tsyringe';

const router = Router();
const vehicletypeController = container.resolve(VehicleTypeController);

router.get('/vehicletype/', vehicletypeController.getAll);
router.get('/vehicletype/search', vehicletypeController.search);
router.get('/vehicletype/:id', vehicletypeController.getById);
router.post('/vehicletype/', vehicletypeController.create);
router.put('/vehicletype/:id', vehicletypeController.update);
router.delete('/vehicletype/:id', vehicletypeController.delete);

export default router;