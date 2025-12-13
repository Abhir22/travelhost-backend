import { IService } from '@/core/interfaces/service.interface';
import { VehicleType, VehicleTypeCreateDto, VehicleTypeUpdateDto } from '@/modules/travels/entities/vehicletype.entity';

export interface IVehicleTypeService extends IService<VehicleType, VehicleTypeCreateDto, VehicleTypeUpdateDto> {
}