import { inject, injectable } from 'tsyringe';
import { HotelType, HotelTypeCreateDto, HotelTypeUpdateDto } from '@/modules/hotels/entities/hoteltype.entity';
import { BaseService } from '@/core/base/base.service';
import { IHotelTypeService } from '@/modules/hotels/services/interfaces/hoteltype.service.interface';

@injectable()
export class HotelTypeService extends BaseService<HotelType, HotelTypeCreateDto, HotelTypeUpdateDto> implements IHotelTypeService {
    constructor(
        @inject('IHotelTypeRepository') repository: any
    ) {
        super(repository);
    }
}
