import { injectable } from 'tsyringe';
import { BaseRepository } from '@/core/base/base.repository';
import { VehicleType, VehicleTypeCreateDto, VehicleTypeUpdateDto } from '@/modules/travels/entities/vehicletype.entity';
import { IVehicleTypeRepository } from './interfaces/vehicletype.repository.interface';

@injectable()
export class VehicleTypeRepository extends BaseRepository<VehicleType, VehicleTypeCreateDto, VehicleTypeUpdateDto> implements IVehicleTypeRepository {
    constructor() {
        super('vehicleType');
    }
}