import { Prisma } from '@prisma/client';

export type PackageSnapshotMapping = Prisma.PackageSnapshotMappingGetPayload<{
  include: {
    package: true,
    snapshot: true
  }
}>;

export type PackageSnapshotMappingCreateDto = Prisma.PackageSnapshotMappingCreateInput;
export type PackageSnapshotMappingUpdateDto = Prisma.PackageSnapshotMappingUpdateInput;
