import { Router } from 'express';
import { DestinationController } from '../controllers/destination.controller';
import { container } from 'tsyringe';

const router = Router();
const destinationController = container.resolve(DestinationController);

router.get('/destination/', destinationController.findWithPagination);
router.get('/destination/search', destinationController.search);
router.get('/destination/:id', destinationController.getById);
router.post('/destination/', destinationController.create);
router.put('/destination/:id', destinationController.update);
router.delete('/destination/:id', destinationController.delete);

export default router;
