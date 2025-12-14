import moment from 'moment';
import { PackageOption } from '../entities/package-option.entity';

export class PackageOptionResponse {
    id: string;
    packageId: string;
    includeGroupDeparture: boolean;
    includeFixedDeparture: boolean;
    includePackageAvailability: boolean;
    createdAt?: string;
    updatedAt?: string;

    constructor(data: PackageOption) {
        this.id = data.id;
        this.packageId = data.packageId;
        this.includeGroupDeparture = data.includeGroupDeparture;
        this.includeFixedDeparture = data.includeFixedDeparture;
        this.includePackageAvailability = data.includePackageAvailability;
        if (data.createdAt) this.createdAt = moment(data.createdAt).format('DD-MM-YYYY');
        if (data.updatedAt) this.updatedAt = moment(data.updatedAt).format('DD-MM-YYYY');
    }
}
