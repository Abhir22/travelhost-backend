import moment from 'moment';
import { PackageTermsCondition } from '../entities/package-terms-condition.entity';

export class PackageTermsConditionResponse {
    id: string;
    packageId: string;
    content: string;
    linkText?: string;
    linkUrl?: string;
    videoUrl?: string;
    imageUrl?: string;
    fileName?: string;
    filePath?: string;
    fileType?: string;
    fileSize?: bigint;
    createdAt?: string;
    updatedAt?: string;

    constructor(data: PackageTermsCondition) {
        this.id = data.id;
        this.packageId = data.packageId;
        this.content = data.content;
        this.linkText = data.linkText || undefined;
        this.linkUrl = data.linkUrl || undefined;
        this.videoUrl = data.videoUrl || undefined;
        this.imageUrl = data.imageUrl || undefined;
        this.fileName = data.fileName || undefined;
        this.filePath = data.filePath || undefined;
        this.fileType = data.fileType || undefined;
        this.fileSize = data.fileSize || undefined;
        if (data.createdAt) this.createdAt = moment(data.createdAt).format('DD-MM-YYYY');
        if (data.updatedAt) this.updatedAt = moment(data.updatedAt).format('DD-MM-YYYY');
    }
}
