import { Router } from 'express';
import { StateController } from '../controllers/state.controller';
import { container } from 'tsyringe';

const router = Router();
const stateController = container.resolve(StateController);

router.get('/state/', stateController.findWithPagination);
router.get('/state/all', stateController.getAll);
router.get('/state/search', stateController.search);
router.get('/state/:id', stateController.getById);
router.post('/state/', stateController.create);
router.put('/state/:id', stateController.update);
router.delete('/state/:id', stateController.delete);

export default router;
