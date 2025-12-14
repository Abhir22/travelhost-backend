import { Prisma } from '@prisma/client';

export type PackageExclusion = Prisma.PackageExclusionGetPayload<{}>;
export type PackageExclusionCreateDto = Prisma.PackageExclusionUncheckedCreateInput;
export type PackageExclusionUpdateDto = Prisma.PackageExclusionUncheckedUpdateInput;
