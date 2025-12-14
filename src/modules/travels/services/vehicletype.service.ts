import { inject, injectable } from 'tsyringe';
import { BaseService } from '@/core/base/base.service';
import { VehicleType, VehicleTypeCreateDto, VehicleTypeUpdateDto } from '@/modules/travels/entities/vehicletype.entity';
import { IVehicleTypeRepository } from '@/modules/travels/repositories/interfaces/vehicletype.repository.interface';
import { IVehicleTypeService } from './interfaces/vehicletype.service.interface';

@injectable()
export class VehicleTypeService extends BaseService<VehicleType, VehicleTypeCreateDto, VehicleTypeUpdateDto> implements IVehicleTypeService {
    constructor(
        @inject('IVehicleTypeRepository') repository: IVehicleTypeRepository
    ) {
        super(repository);
    }
}