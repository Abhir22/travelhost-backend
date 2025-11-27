import { IService } from '@/core/interfaces/service.interface';
import { TravelType, TravelTypeCreateDto, TravelTypeUpdateDto } from '@/modules/travels/entities/traveltype.entity';

export interface ITravelTypeService extends IService<TravelType, TravelTypeCreateDto, TravelTypeUpdateDto> {
  // Add custom service methods here
}
