import { Prisma } from '@prisma/client';

export type PackageOption = Prisma.PackageOptionGetPayload<{}>;
export type PackageOptionCreateDto = Prisma.PackageOptionUncheckedCreateInput;
export type PackageOptionUpdateDto = Prisma.PackageOptionUncheckedUpdateInput;
