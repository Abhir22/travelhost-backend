import { IRepository } from '@/core/interfaces/repository.interface';
import { VehicleType, VehicleTypeCreateDto, VehicleTypeUpdateDto } from '@/modules/travels/entities/vehicletype.entity';

export interface IVehicleTypeRepository extends IRepository<VehicleType, VehicleTypeCreateDto, VehicleTypeUpdateDto> {
}