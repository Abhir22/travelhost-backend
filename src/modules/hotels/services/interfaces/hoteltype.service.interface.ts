
import { IService } from '@/core/interfaces/service.interface';
import { HotelType, HotelTypeCreateDto, HotelTypeUpdateDto } from '@/modules/hotels/entities/hoteltype.entity';

export interface IHotelTypeService extends IService<HotelType, HotelTypeCreateDto, HotelTypeUpdateDto> {
}
