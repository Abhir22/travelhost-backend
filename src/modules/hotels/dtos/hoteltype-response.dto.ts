import moment from 'moment';
import { HotelType } from "../entities/hoteltype.entity";

export class HotelTypeResponse {
    id?: string;
    name: string;
    description?: string | null;
    createdAt?: string;
    updatedAt?: string;

    constructor(hoteltype: Partial<HotelType>) {
        if ('id' in hoteltype && hoteltype.id) this.id = hoteltype.id;
        this.name = hoteltype.name!;
        this.description = hoteltype.description;
        if ('createdAt' in hoteltype && hoteltype.createdAt) this.createdAt = moment(hoteltype.createdAt).format('DD-MM-YYYY');
        if ('updatedAt' in hoteltype && hoteltype.updatedAt) this.updatedAt = moment(hoteltype.updatedAt).format('DD-MM-YYYY');
    }
}
