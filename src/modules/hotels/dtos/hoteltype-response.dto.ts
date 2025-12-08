import { HotelType } from "../entities/hoteltype.entity";

export class HotelTypeResponse {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    name: string;
    description?: string | null;


    constructor(hoteltype: Partial<HotelType>) {
        if ('id' in hoteltype) this.id = hoteltype.id;
        if ('createdAt' in hoteltype) this.createdAt = hoteltype.createdAt;
        if ('updatedAt' in hoteltype) this.updatedAt = hoteltype.updatedAt;
        this.name = hoteltype.name!;
        this.description = hoteltype.description;


    }
}
