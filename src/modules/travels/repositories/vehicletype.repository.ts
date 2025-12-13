import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { VehicleType, VehicleTypeCreateDto, VehicleTypeUpdateDto } from '@/modules/travels/entities/vehicletype.entity';
import { IVehicleTypeRepository } from './interfaces/vehicletype.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class VehicleTypeRepository extends BaseRepository<VehicleType, VehicleTypeCreateDto, VehicleTypeUpdateDto> implements IVehicleTypeRepository {
    constructor() {
        super(prisma, 'VehicleType');
    }
}