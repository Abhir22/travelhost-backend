import { VehicleType } from "../entities/vehicletype.entity";

export class VehicleTypeResponse {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    name: string;
    vehicleCategory: string;

    constructor(vehicletype: Partial<VehicleType>) {
        if ('id' in vehicletype) this.id = vehicletype.id;
        if ('createdAt' in vehicletype) this.createdAt = vehicletype.createdAt;
        if ('updatedAt' in vehicletype) this.updatedAt = vehicletype.updatedAt;
        this.name = vehicletype.name!;
        this.vehicleCategory = vehicletype.vehicleCategory!;
    }
}