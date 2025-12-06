import { Router } from 'express';
import { HotelRoomController } from '../controllers/hotelroom.controller';
import { container } from 'tsyringe';

const router = Router();
const hotelroomController = container.resolve(HotelRoomController);

router.get('/hotelroom/', hotelroomController.findWithPagination);
router.get('/hotelroom/search', hotelroomController.search);
router.get('/hotelroom/:id', hotelroomController.getById);
router.post('/hotelroom/', hotelroomController.create);
router.put('/hotelroom/:id', hotelroomController.update);
router.delete('/hotelroom/:id', hotelroomController.delete);

export default router;
