import { Prisma } from '@prisma/client';

export type PackageInclusion = Prisma.PackageInclusionGetPayload<{}>;
export type PackageInclusionCreateDto = Prisma.PackageInclusionUncheckedCreateInput;
export type PackageInclusionUpdateDto = Prisma.PackageInclusionUncheckedUpdateInput;
