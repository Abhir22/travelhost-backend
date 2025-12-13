import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { IVehicleTypeService } from '@/modules/travels/services/interfaces/vehicletype.service.interface';
import { VehicleType, VehicleTypeCreateDto, VehicleTypeUpdateDto } from '@/modules/travels/entities/vehicletype.entity';
import { VehicleTypeResponse } from '../dtos/vehicletype-response.dto';
import { vehicletypeValidation } from '@/modules/travels/validations/vehicletype.validation';

@injectable()
export class VehicleTypeController extends BaseController<VehicleType, VehicleTypeCreateDto, VehicleTypeUpdateDto> {
    constructor(
        @inject('IVehicleTypeService') private vehicletypeService: IVehicleTypeService
    ) {
        super({
            service: vehicletypeService,
            responseClass: VehicleTypeResponse,
            createSchema: vehicletypeValidation.create,
            updateSchema: vehicletypeValidation.update,
            searchFields: ['name', 'vehicleCategory'],
            defaultInclude: {},
        });
    }
}