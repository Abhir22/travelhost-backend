import { IRepository } from '@/core/interfaces/repository.interface';
import { HotelType, HotelTypeCreateDto, HotelTypeUpdateDto } from '@/modules/hotels/entities/hoteltype.entity';

export interface IHotelTypeRepository extends IRepository<HotelType, HotelTypeCreateDto, HotelTypeUpdateDto> {
}
