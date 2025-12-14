import { IService } from '@/core/interfaces/service.interface';
import { PackageGallery, PackageGalleryCreateDto, PackageGalleryUpdateDto } from '../../entities/package-gallery.entity';

export interface IPackageGalleryService extends IService<PackageGallery, PackageGalleryCreateDto, PackageGalleryUpdateDto> {
}
