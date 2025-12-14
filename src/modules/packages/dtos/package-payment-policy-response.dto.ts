import moment from 'moment';
import { PackagePaymentPolicy } from '../entities/package-payment-policy.entity';

export class PackagePaymentPolicyResponse {
    id: string;
    packageId: string;
    content: string;
    createdAt?: string;
    updatedAt?: string;

    constructor(data: PackagePaymentPolicy) {
        this.id = data.id;
        this.packageId = data.packageId;
        this.content = data.content;
        if (data.createdAt) this.createdAt = moment(data.createdAt).format('DD-MM-YYYY');
        if (data.updatedAt) this.updatedAt = moment(data.updatedAt).format('DD-MM-YYYY');
    }
}
