import { Prisma } from '@prisma/client';

export type PackageInclusion = Prisma.PackageInclusionGetPayload<{}>;
export type PackageInclusionCreateDto = Prisma.PackageInclusionCreateInput;
export type PackageInclusionUpdateDto = Prisma.PackageInclusionUpdateInput;
