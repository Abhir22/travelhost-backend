import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { HotelType, HotelTypeCreateDto, HotelTypeUpdateDto } from '@/modules/hotels/entities/hoteltype.entity';
import { IHotelTypeRepository } from '@/modules/hotels/repositories/interfaces/hoteltype.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class HotelTypeRepository extends BaseRepository<HotelType, HotelTypeCreateDto, HotelTypeUpdateDto> implements IHotelTypeRepository {
    constructor() {
        super(prisma, 'HotelType');
    }
}
