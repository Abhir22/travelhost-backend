import moment from 'moment';
import { PackageCancellationPolicy } from '../entities/package-cancellation-policy.entity';

export class PackageCancellationPolicyResponse {
    id: string;
    packageId: string;
    content: string;
    createdAt?: string;
    updatedAt?: string;

    constructor(data: PackageCancellationPolicy) {
        this.id = data.id;
        this.packageId = data.packageId;
        this.content = data.content;
        if (data.createdAt) this.createdAt = moment(data.createdAt).format('DD-MM-YYYY');
        if (data.updatedAt) this.updatedAt = moment(data.updatedAt).format('DD-MM-YYYY');
    }
}
