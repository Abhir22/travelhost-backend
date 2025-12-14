import { inject, injectable } from 'tsyringe';
import { BaseService } from '@/core/base/base.service';
import { PackageGallery, PackageGalleryCreateDto, PackageGalleryUpdateDto } from '@/modules/packages/entities/package-gallery.entity';
import { IPackageGalleryRepository } from '@/modules/packages/repositories/interfaces/package-gallery.repository.interface';
import { IPackageGalleryService } from './interfaces/package-gallery.service.interface';

@injectable()
export class PackageGalleryService extends BaseService<PackageGallery, PackageGalleryCreateDto, PackageGalleryUpdateDto> implements IPackageGalleryService {
    constructor(
        @inject('IPackageGalleryRepository') repository: IPackageGalleryRepository
    ) {
        super(repository);
    }
}
