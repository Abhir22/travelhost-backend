import { BaseRepository } from '@/core/base/base.repository';
import { prisma } from '@/loaders/prisma';
import { PackageGallery, PackageGalleryCreateDto, PackageGalleryUpdateDto } from '@/modules/packages/entities/package-gallery.entity';
import { IPackageGalleryRepository } from './interfaces/package-gallery.repository.interface';
import { Repository } from '@/core/decorators/repository.decorator';

@Repository()
export class PackageGalleryRepository extends BaseRepository<PackageGallery, PackageGalleryCreateDto, PackageGalleryUpdateDto> implements IPackageGalleryRepository {
    constructor() {
        super(prisma, 'PackageGallery');
    }
}
