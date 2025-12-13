import moment from 'moment';
import { VehicleType } from "../entities/vehicletype.entity";

export class VehicleTypeResponse {
    id?: string;
    name: string;
    vehicleCategory: string;
    createdAt?: string;
    updatedAt?: string;

    constructor(vehicletype: Partial<VehicleType>) {
        if ('id' in vehicletype && vehicletype.id) this.id = vehicletype.id;
        this.name = vehicletype.name!;
        this.vehicleCategory = vehicletype.vehicleCategory!;
        if ('createdAt' in vehicletype && vehicletype.createdAt) this.createdAt = moment(vehicletype.createdAt).format('YYYY-MM-DD');
        if ('updatedAt' in vehicletype && vehicletype.updatedAt) this.updatedAt = moment(vehicletype.updatedAt).format('YYYY-MM-DD');
    }
}