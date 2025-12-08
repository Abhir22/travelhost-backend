import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { IHotelTypeService } from '@/modules/hotels/services/interfaces/hoteltype.service.interface';
import { HotelType, HotelTypeCreateDto, HotelTypeUpdateDto } from '@/modules/hotels/entities/hoteltype.entity';
import { HotelTypeResponse } from '../dtos/hoteltype-response.dto';
import { hoteltypeValidation } from '@/modules/hotels/validations/hoteltype.validation';

@injectable()
export class HotelTypeController extends BaseController<HotelType, HotelTypeCreateDto, HotelTypeUpdateDto> {
    constructor(
        @inject('IHotelTypeService') private hoteltypeService: IHotelTypeService
    ) {
        super({
            service: hoteltypeService,
            responseClass: HotelTypeResponse,
            createSchema: hoteltypeValidation.create,
            updateSchema: hoteltypeValidation.update,
            searchFields: ['name'],
            defaultInclude: {},
        });
    }
}
