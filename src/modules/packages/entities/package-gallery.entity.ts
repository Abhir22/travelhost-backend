import { Prisma } from '@prisma/client';

export type PackageGallery = Prisma.PackageGalleryGetPayload<{}>;
export type PackageGalleryCreateDto = Prisma.PackageGalleryUncheckedCreateInput;
export type PackageGalleryUpdateDto = Prisma.PackageGalleryUncheckedUpdateInput;
