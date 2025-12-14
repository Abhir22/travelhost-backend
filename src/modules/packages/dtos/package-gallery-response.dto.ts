import moment from 'moment';
import { PackageGallery } from '../entities/package-gallery.entity';

export class PackageGalleryResponse {
    id: string;
    packageId: string;
    imageUrl: string;
    imageOrder: number;
    isCover: boolean;
    createdAt?: string;

    constructor(data: PackageGallery) {
        this.id = data.id;
        this.packageId = data.packageId;
        this.imageUrl = data.imageUrl;
        this.imageOrder = data.imageOrder;
        this.isCover = data.isCover;
        if (data.createdAt) this.createdAt = moment(data.createdAt).format('DD-MM-YYYY');
    }
}
