import { inject, injectable } from 'tsyringe';
import { BaseController } from '@/core/base/base.controller';
import { PackageGallery, PackageGalleryCreateDto, PackageGalleryUpdateDto } from '@/modules/packages/entities/package-gallery.entity';
import { IPackageGalleryService } from '@/modules/packages/services/interfaces/package-gallery.service.interface';
import { PackageGalleryResponse } from '@/modules/packages/dtos/package-gallery-response.dto';
import { packageGalleryValidation } from '@/modules/packages/validations/package-gallery.validation';

@injectable()
export class PackageGalleryController extends BaseController<PackageGallery, PackageGalleryCreateDto, PackageGalleryUpdateDto> {
    constructor(
        @inject('IPackageGalleryService') service: IPackageGalleryService
    ) {
        super({
            service,
            responseClass: PackageGalleryResponse,
            createSchema: packageGalleryValidation.create,
            updateSchema: packageGalleryValidation.update,
            searchFields: ['imageUrl'],
        });
    }
}
