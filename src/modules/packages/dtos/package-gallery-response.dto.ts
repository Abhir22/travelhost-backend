import moment from 'moment';
import { PackageGallery } from '../entities/package-gallery.entity';
import { getS3Url } from '@/adapters/aws-s3/s3.config';

export class PackageGalleryResponse {
    id: string;
    packageId: string;
    imagePath: string;  // Raw S3 path stored in DB
    imageUrl: string;   // Full constructed S3 URL
    imageOrder: number;
    isCover: boolean;
    createdAt?: string;

    constructor(data: PackageGallery) {
        this.id = data.id;
        this.packageId = data.packageId;
        // Store the raw path and construct full URL
        this.imagePath = data.imageUrl;  // This is the S3 path stored in DB
        this.imageUrl = getS3Url(data.imageUrl);  // Construct full URL from path
        this.imageOrder = data.imageOrder;
        this.isCover = data.isCover;
        if (data.createdAt) this.createdAt = moment(data.createdAt).format('DD-MM-YYYY');
    }
}
