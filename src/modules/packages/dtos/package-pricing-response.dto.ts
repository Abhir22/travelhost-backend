import moment from 'moment';
import { PackagePricing } from '../entities/package-pricing.entity';
import { Decimal } from '@prisma/client/runtime/library';

export class PackagePricingResponse {
    id: string;
    packageId: string;
    season: string;
    dateFrom: string;
    dateTo: string;
    rackRate: Decimal;
    publishedRate: Decimal;
    customerDiscountPercentage?: Decimal;
    customerDiscountAmount?: Decimal;
    adultRate?: Decimal;
    agentDiscountPercentage?: Decimal;
    agentDiscountAmount?: Decimal;
    agentRate?: Decimal;
    childRate?: Decimal;
    infantRate?: Decimal;
    createdAt?: string;
    updatedAt?: string;

    constructor(data: PackagePricing) {
        this.id = data.id;
        this.packageId = data.packageId;
        this.season = data.season;
        this.dateFrom = moment(data.dateFrom).format('YYYY-MM-DD');
        this.dateTo = moment(data.dateTo).format('YYYY-MM-DD');
        this.rackRate = data.rackRate;
        this.publishedRate = data.publishedRate;
        this.customerDiscountPercentage = data.customerDiscountPercentage || undefined;
        this.customerDiscountAmount = data.customerDiscountAmount || undefined;
        this.adultRate = data.adultRate || undefined;
        this.agentDiscountPercentage = data.agentDiscountPercentage || undefined;
        this.agentDiscountAmount = data.agentDiscountAmount || undefined;
        this.agentRate = data.agentRate || undefined;
        this.childRate = data.childRate || undefined;
        this.infantRate = data.infantRate || undefined;
        if (data.createdAt) this.createdAt = moment(data.createdAt).format('DD-MM-YYYY');
        if (data.updatedAt) this.updatedAt = moment(data.updatedAt).format('DD-MM-YYYY');
    }
}
