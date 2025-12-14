import { IRepository } from '@/core/interfaces/repository.interface';
import { PackageGallery, PackageGalleryCreateDto, PackageGalleryUpdateDto } from '../../entities/package-gallery.entity';

export interface IPackageGalleryRepository extends IRepository<PackageGallery, PackageGalleryCreateDto, PackageGalleryUpdateDto> {
}
