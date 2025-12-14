import { Prisma } from '@prisma/client';

export type PackageExclusion = Prisma.PackageExclusionGetPayload<{}>;
export type PackageExclusionCreateDto = Prisma.PackageExclusionCreateInput;
export type PackageExclusionUpdateDto = Prisma.PackageExclusionUpdateInput;
